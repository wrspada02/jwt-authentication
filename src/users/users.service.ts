import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '../entities/User';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async findOne(username: string) {
    if (!username) throw new BadRequestException();

    return this.userRepository.findOne(username);
  }

  async create(user: User) {
    if (!user.username || !user.password) throw new BadRequestException();

    return this.userRepository.create(user);
  }
}
