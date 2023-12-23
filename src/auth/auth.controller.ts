import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens } from 'src/common/types/tokens';
import { JWTRtGuard } from 'src/common/guards/jwt.rt.guard';
import { GetCurrentUserId } from 'src/common/decorators/get.current.user.id.decorator';
import { AuthGuard } from '@nestjs/passport';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthGuard } from 'src/common/guards/google.auth.guard';
import { GetCurrentUser } from 'src/common/decorators/get.current.user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signupDto: SignupDto): Promise<Tokens> {
    return this.authService.signup(signupDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<Tokens> {
    return this.authService.login(loginDto);
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @UseGuards(JWTRtGuard)
  @Post('/refresh')
  refreshTokens(@GetCurrentUser() user) {
    this.authService.refreshTokens(user.id, user.refreshToken);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@GetCurrentUser() user) {
    return this.authService.validateOAuthLogin(user);
  }
}
