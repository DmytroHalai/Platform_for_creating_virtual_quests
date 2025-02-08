import * as bcrypt from 'bcryptjs';
import { Injectable, NotFoundException, Response } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IGoogleUser, IUser } from 'src/constants/types/user/user';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: IUser) {
    const payload = {
      user_id: user.user_id,
      sub: user.user_id,
    };
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateGoogleUser(profile: IGoogleUser) {
    if (!profile.isEmailConfirmed) {
      throw new NotFoundException('user email is not confirm');
    }
    const user = await this.usersService.findOneByEmail(profile.email);
    if (!user) {
      return await this.usersService.createByGoogle(profile);
    }
    return user;
  }
}
