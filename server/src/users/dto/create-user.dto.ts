import { IsNotEmpty, IsEmail, MinLength } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'igor1', description: 'User username' })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'igor@gmail.com', description: 'User email' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123123', description: 'User password' })
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  gender?: string;

  @IsNotEmpty()
  dateOfBirth?: string;
}
