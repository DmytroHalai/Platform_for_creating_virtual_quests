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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/registration')
  async create(@Body() createUserDto: CreateUserDto, @Response() res) {
    await this.usersService.create(createUserDto);
    return res.send({ message: 'Logged in successfully' });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.usersService.findAll();
  }

  @Post('confirm')
  async confirmEmail(@Query('token') token: string, @Response() res) {
    const message = await this.usersService.confirmEmail(token);
    this.usersService.setUserCookie(res, token);
    return res.send({ message });
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
