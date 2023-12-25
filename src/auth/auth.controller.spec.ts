import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { SuccessDto } from 'src/common/dto/success.dto';
import { JwtPayloadWithRefreshToken } from './strategies/jwt.rt.strategy';
import { GoogleUser } from './strategies/google.strategy';
import { Tokens } from 'src/common/types/tokens';

const mockAuthService = {
  signup: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  refreshTokens: jest.fn(),
  validateOAuthLogin: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should return tokens on successful signup', async () => {
      const result: Tokens = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };
      const signupDto: SignupDto = {
        email: 'user@example.com',
        password: '1234',
        firstName: 'firstName',
        lastName: 'lastName',
      };

      console.log({ signupDto });

      mockAuthService.signup.mockResolvedValue(result);
      expect(await controller.signUp(signupDto)).toEqual(result);
      expect(mockAuthService.signup).toHaveBeenCalledWith(signupDto);
    });
  });

  describe('login', () => {
    it('should return tokens on successful login', async () => {
      const result: Tokens = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };
      const loginDto: LoginDto = {
        email: 'user@example.com',
        password: '1234',
      };

      mockAuthService.login.mockResolvedValue(result);
      expect(await controller.login(loginDto)).toEqual(result);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('logout', () => {
    it('should return success dto on successful logout', async () => {
      const userId = 1; // assuming user ID is a number
      const response = new SuccessDto('You have been successfully logged out.');

      mockAuthService.logout.mockResolvedValue(undefined);
      expect(await controller.logout(userId)).toEqual(response);
      expect(mockAuthService.logout).toHaveBeenCalledWith(userId);
    });
  });

  describe('refreshTokens', () => {
    it('should return new tokens', async () => {
      const user: JwtPayloadWithRefreshToken = {
        id: 1,
        email: 'user@example.com',
        refreshToken: 'refresh_token',
      };
      const result: Tokens = {
        access_token: 'new_access_token',
        refresh_token: 'new_refresh_token',
      };

      mockAuthService.refreshTokens.mockResolvedValue(result);
      expect(await controller.refreshTokens(user)).toEqual(result);
      expect(mockAuthService.refreshTokens).toHaveBeenCalledWith(
        user.id,
        user.refreshToken,
      );
    });
  });

  describe('googleAuth', () => {
    // Testing googleAuth might involve mocking the request and response as it's a third-party interaction.
    // You might want to focus on whether the right guards and strategies are called and handle responses.
  });

  describe('googleAuthRedirect', () => {
    it('should return tokens after Google OAuth', async () => {
      const user: GoogleUser = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'user@example.com',
        picture: 'pictureUrl',
      };
      const result: Tokens = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };

      mockAuthService.validateOAuthLogin.mockResolvedValue(result);
      expect(await controller.googleAuthRedirect(user)).toEqual(result);
      expect(mockAuthService.validateOAuthLogin).toHaveBeenCalledWith(user);
    });
  });
});
