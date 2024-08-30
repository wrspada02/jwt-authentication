import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AppModule } from '../app.module';
import { UserController } from './users.controller';
import { User } from '../entities/User';
import { UsersService } from './users.service';
import { User as UserModel } from '../models/User';

const user: User = {
  password: 'dhuiashudasdsa',
  username: 'dusahdusahidas',
};

describe('AuthController - unit tests', () => {
  let userController: UserController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should throw 400 status if not send username or password', async () => {
    try {
      await userController.create({ password: '', username: '' });
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.status).toBe(400);
    }
  });

  it('should return 200 if data is correct', async () => {
    jest
      .spyOn(userService, 'create')
      .mockImplementation(() => Promise.resolve(new UserModel(user)));
    const response = await userController.create(user);

    expect(response).toBeDefined();
  });
});
