import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/constants/types/user/user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IUser) {
    const { user_id, email, role, username } = user;
    const payload = { user_id, email, role, username, sub: user_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
