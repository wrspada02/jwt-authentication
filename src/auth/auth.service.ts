import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    const isMatchPassword = await bcrypt.compare(pass, user.password);

    if (!user) {
      throw new NotFoundException();
    }

    if (!isMatchPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
