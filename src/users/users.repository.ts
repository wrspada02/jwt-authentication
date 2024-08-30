import { Injectable } from '@nestjs/common';
import { User } from '../entities/User';
import { User as UserModel } from '../models/User';

@Injectable()
export class UsersRepository {
  async create(user: User) {
    return await new UserModel(user).save();
  }

  async findOne(username: string) {
    return await UserModel.findOne({ username });
  }
}
