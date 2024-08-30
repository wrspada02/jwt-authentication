import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/User';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  create(@Body() user: User) {
    return this.userService.create(user);
  }
}
