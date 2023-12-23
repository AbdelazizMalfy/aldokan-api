import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from 'src/common/types/tokens';
import { SignupDto } from './dto/signup.dto';
import { ConfigService } from '@nestjs/config';
import { GoogleUser } from './strategies/google.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signup(signupDto: SignupDto): Promise<Tokens> {
    const hash = await this.hash(signupDto.password);

    const user = await this.usersRepository.create({
      firstName: signupDto.firstName,
      lastName: signupDto.lastName,
      email: signupDto.email,
      password: hash,
    });

    await this.usersRepository.save(user);

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async login(loginDto: LoginDto): Promise<Tokens> {
    const user = await this.usersRepository.findOneByOrFail({
      email: loginDto.email,
    });

    if (!user || !user.password) {
      throw new ForbiddenException('Access Denied');
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.usersRepository.update(
      {
        id: userId,
        refreshToken: Not(IsNull()),
      },
      {
        refreshToken: null,
      },
    );

    return true;
  }

  async validateOAuthLogin(profile: GoogleUser): Promise<Tokens> {
    // Here you would find or create a user in your database
    let user = await this.usersRepository.findOneBy({
      email: profile.email,
    });

    if (!user) {
      // Create a new user if doesn't exist
      user = this.usersRepository.create({
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        avatar: profile.picture,
      });
      await this.usersRepository.save(user);
    }

    // // Then you would create a JWT token for that user
    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersRepository.findOneByOrFail({ id: userId });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const isValidRefreshToken = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isValidRefreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshHash(userId: number, refreshToken) {
    const hash = await this.hash(refreshToken);

    await this.usersRepository.update(
      {
        id: userId,
      },
      {
        refreshToken: hash,
      },
    );
  }

  async hash(data: string) {
    return await bcrypt.hash(data, 10);
  }

  async generateTokens(userId: number, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: this.config.get<string>('JWT_SECRET'),
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: this.config.get<string>('JWT_RT_SECRET'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
