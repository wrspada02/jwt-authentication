import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/User';
import { User as UserModel } from '../models/User';

@Injectable()
export class UsersRepository {
  async create(user: User) {
    const saltOrRounds = 10;
    const password = await bcrypt.hash(user.password, saltOrRounds);

    return await new UserModel({ ...user, password }).save();
  }

  async findOne(username: string) {
    return await UserModel.findOne({ username });
  }
}
