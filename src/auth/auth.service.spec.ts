import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AppModule } from '../app.module';
import { User } from '../models/User';

const user = new User({
  username: 'maria',
  password: 'guess',
});

describe('AuthService - unit tests', () => {
  let authService: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);

    jest
      .spyOn(userService, 'findOne')
      .mockImplementation(() => Promise.resolve(user));
  });

  it('should throw 401 if not found the user by provided username', async () => {
    expect(authService.signIn('dhuasihduas', 'dhuasihduas')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw 401 if password does not match', async () => {
    await expect(
      authService.signIn(user.username, 'dysagydsa'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return jwt access token', async () => {
    await expect(
      authService.signIn(user.username, user.password),
    ).resolves.toBeDefined();
  });
});
