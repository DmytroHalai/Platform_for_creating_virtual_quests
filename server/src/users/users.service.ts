import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { REPOSITORY } from 'src/constants/enums/repositories';
import { User } from './entities/user.entity';
import { LessThan, Repository } from 'typeorm';
import { BCRYPT } from 'src/constants/enums/bcryptSalt';
import { JwtService } from '@nestjs/jwt';
import { EMAIL } from 'src/constants/enums/email';
import { SCHEDULE } from 'src/constants/enums/scheduleConfig';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REPOSITORY.USER)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    const hashPassword = await bcrypt.hash(password, BCRYPT.SALT);
    const user = this.userRepository.create({
      ...userData,
      password: hashPassword,
    });
    await this.userRepository.save(user);
    const payload = {
      user_id: user.user_id,
      sub: user.user_id,
    };
    const token = this.jwtService.sign(payload);
    await this.emailService.sendConfirmationEmail(user.email, token);
  }

  async createByGoogle(profile: CreateUserDto) {
    return await this.userRepository.save(profile);
  }

  async confirmEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      console.log(decoded);

      const user = await this.findOneById(decoded.user_id);
      user.isEmailConfirmed = true;
      await this.userRepository.save(user);
      return EMAIL.CONFIRM_SUCCESS;
    } catch (error) {
      throw new NotFoundException('Invalid or expired token');
    }
  }

  async findOverdue(time: Date) {
    return await this.userRepository.find({
      where: {
        isEmailConfirmed: false,
        //created_at: LessThan(time),
      },
    });
  }

  async removeOverdue(usersToDelete) {
    return await this.userRepository.remove(usersToDelete);
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async findAll() {
    return `This action returns all users`;
  async findById(userId: number) {
    return this.userRepository.findOneBy({ user_id: userId });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
