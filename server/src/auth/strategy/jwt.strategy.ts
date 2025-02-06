import 'dotenv/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IUser } from 'src/constants/types/user/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: String(process.env.JWT_SECRET_KEY),
    });
  }

  async validate(user: IUser) {
    const { user_id, email, role, username } = user;
    return { user_id, email, role, username };
  }
}
