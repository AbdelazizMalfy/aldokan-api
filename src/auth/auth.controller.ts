import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens } from 'src/common/types/tokens';
import { RefreshTokenGuard } from 'src/common/guards/jwt.rt.guard';
import { GetCurrentUserId } from 'src/common/decorators/get.current.user.id.decorator';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthGuard } from 'src/common/guards/google.auth.guard';
import { GetCurrentUser } from 'src/common/decorators/get.current.user.decorator';
import { SuccessDto } from 'src/common/dto/success.dto';
import { JwtPayloadWithRefreshToken } from './strategies/jwt.rt.strategy';
import { GoogleUser } from './strategies/google.strategy';
import { AccessTokenGuard } from 'src/common/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signupDto: SignupDto): Promise<Tokens> {
    return await this.authService.signup(signupDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<Tokens> {
    return await this.authService.login(loginDto);
  }

  @Post('/logout')
  @UseGuards(AccessTokenGuard)
  async logout(@GetCurrentUserId() userId: number): Promise<SuccessDto> {
    await this.authService.logout(userId);
    return new SuccessDto('You have been successfully logged out.');
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  async refreshTokens(
    @GetCurrentUser() user: JwtPayloadWithRefreshToken,
  ): Promise<Tokens> {
    return await this.authService.refreshTokens(user.id, user.refreshToken);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @GetCurrentUser() user: GoogleUser,
  ): Promise<Tokens> {
    return await this.authService.validateOAuthLogin(user);
  }
}
