import * as bcrypt from 'bcryptjs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { REPOSITORY } from 'src/constants/enums/repositories';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BCRYPT } from 'src/constants/enums/bcryptSalt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REPOSITORY.USER)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    const hashPassword = await bcrypt.hash(password, BCRYPT.SALT);

    const user = this.userRepository.create({
      ...userData,
      password: hashPassword,
    });

    const token = this.jwtService.sign({
      email: user.email,
      user_id: user.user_id,
      role: user.role,
      username: user.username,
    });

    return { token };
  }

  async findAll() {
    return `This action returns all users`;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
