import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Response,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CookieService } from 'src/cookie/cookie.service';
import { GetUser } from 'src/common/decorators/getUser';
import { IUser } from 'src/constants/types/user/user';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('/registration')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return { message: 'Logged in successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('confirm')
  async confirmEmail(@Query('token') token: string, @Response() res) {
    const message = await this.usersService.confirmEmail(token);
    this.cookieService.setUserCookie(res, token);
    return res.send({ message });
  }

  @Get('count')
  async countAllActiveUsers(@Response() res) {
    const count = await this.usersService.countAllActiveUsers();
    return res.send({ count });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async findProfile(@Response() res, @GetUser() id: IUser) {
    const user = await this.usersService.findProfile(+id);
    return res.send({ user });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
    @GetUser() id: IUser,
    @Body() updateUserDto: UpdateUserDto,
    @Response() res,
  ) {
    const update = await this.usersService.update(+id, updateUserDto);
    return res.send({ update });
  }

  @Get('rating')
  async selectRating(@Response() res) {
    const users = await this.usersService.selectRating();
    return res.send({ users });
  }

  @Get(':username')
  async findByName(@Response() res, @Param('username') username: string) {
    const user = await this.usersService.findByName(username);
    return res.send({ user });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOneByEmail(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
