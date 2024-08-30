import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { User } from '../models/User';
import { AuthService } from './auth.service';

const user = new User({
  username: 'maria',
  password: 'guess',
});

describe('AuthController - unit tests', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should return 404 if the user is not found', async () => {
    jest
      .spyOn(userService, 'findOne')
      .mockImplementation(() => Promise.resolve(null));

    jest
      .spyOn(authService, 'signIn')
      .mockImplementation(() =>
        Promise.resolve({ access_token: 'dhuasyghdsahgdas' }),
      );

    try {
      await authController.signIn({
        username: '',
        password: '',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.status).toBe(404);
    }
  });

  it('should return 401 if the password is not correct', async () => {
    jest
      .spyOn(userService, 'findOne')
      .mockImplementation(() => Promise.resolve(user));

    try {
      await authController.signIn({
        username: user.username,
        password: 'dsayughdgyasdgysa',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
      expect(e.status).toBe(401);
    }
  });

  it('should return 200 if the password is correct', async () => {
    jest
      .spyOn(userService, 'findOne')
      .mockImplementation(() => Promise.resolve(user));

    jest
      .spyOn(authService, 'signIn')
      .mockImplementation(() =>
        Promise.resolve({ access_token: 'dhuasyghdsahgdas' }),
      );

    const response = await authController.signIn({
      username: user.username,
      password: user.password,
    });

    expect(response).toBeDefined();
  });
});
