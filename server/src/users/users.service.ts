import "dotenv/config";
import * as bcrypt from "bcryptjs";
import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { REPOSITORY } from "src/constants/enums/repositories";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { BCRYPT } from "src/constants/enums/bcryptSalt";
import { JwtService } from "@nestjs/jwt";
import { EMAIL } from "src/constants/enums/email";
import { EmailService } from "src/email/email.service";
import {
  TokenException,
  UserNotFoundException,
  UserOwnerException,
} from "src/exceptions/custom.exceptions";

@Injectable()
export class UsersService {
  constructor(
    @Inject(REPOSITORY.USER)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
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
    return { message: "Logged in successfully" };
  }

  async confirmEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.findOneById(decoded.user_id);
      user.isEmailConfirmed = true;
      await this.userRepository.save(user);
      return EMAIL.CONFIRM_SUCCESS;
    } catch (error) {
      throw new TokenException();
    }
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async countAllActiveUsers() {
    const activeUserCount = await this.userRepository.count({
      where: { isEmailConfirmed: true },
    });
    return activeUserCount;
  }

  async findProfile(id: number) {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
      relations: ["quests", "quests.ratings", "progress"],
    });
    if (!user) throw new UserNotFoundException();
    const { password, ...userData } = user;
    return userData;
  }

  async findByName(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new UserNotFoundException();
    const userProfile = await this.findProfile(+user.user_id);
    return userProfile;
  }

  async remove(id: number, user_id: number) {
    const user = await this.findById(id);
    if (!user) throw new UserNotFoundException();
    if (user.user_id !== user_id) throw new UserOwnerException();
    await this.userRepository.remove(user);
    return `User ${user.user_id} deleted successfully`;
  }

  async createByGoogle(profile: CreateUserDto) {
    return await this.userRepository.save(profile);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return `User ${id} update successfully`;
  }

  async findById(userId: number) {
    return this.userRepository.findOneBy({ user_id: userId });
  }

  async removeOverdue(usersToDelete) {
    return await this.userRepository.remove(usersToDelete);
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async selectRating() {
    const users = await this.userRepository.find({
      select: {
        username: true,
        ratings: {
          rating: true,
        },
      },
      relations: ["ratings"],
    });
    return users;
  }

  async findOverdue() {
    return await this.userRepository.find({
      where: {
        isEmailConfirmed: false,
      },
    });
  }
}
