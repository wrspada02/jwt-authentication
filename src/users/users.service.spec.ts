import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AppModule } from '../app.module';
import { User } from '../models/User';
import { UsersRepository } from './users.repository';
import { BadRequestException } from '@nestjs/common';

const user = new User({
  username: 'maria',
  password: 'guess',
});

describe('UserService - unit tests', () => {
  let userService: UsersService;
  let userRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<UsersRepository>(UsersRepository);

    jest
      .spyOn(userRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(user));

    jest
      .spyOn(userRepository, 'create')
      .mockImplementation(() => Promise.resolve(user));
  });

  it('should throw bad request if not send username to find', async () => {
    await expect(userService.findOne('')).rejects.toThrow(BadRequestException);
  });

  it('should return defined object if send username', async () => {
    await expect(userService.findOne('dsaygdguysadsa')).resolves.toBeDefined();
  });

  it('should throw bad request if not send username or password', async () => {
    await Promise.all([
      expect(
        userService.create({ password: '', username: '' }),
      ).rejects.toThrow(BadRequestException),
      expect(
        userService.create({ password: 'gdyagydusadas', username: '' }),
      ).rejects.toThrow(BadRequestException),
      expect(
        userService.create({ password: '', username: 'sahusgaugsa' }),
      ).rejects.toThrow(BadRequestException),
    ]);
  });

  it('should return defined object if send username and password', async () => {
    await expect(
      userService.create({
        password: 'dgsyagdyasdas',
        username: 'dhsahgduysaguydas',
      }),
    ).resolves.toBeDefined();
  });
});
