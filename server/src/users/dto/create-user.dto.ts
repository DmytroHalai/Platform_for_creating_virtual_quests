import { IsNotEmpty, IsEmail, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: "Igor", description: "User username" })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: "aman@gmail.com", description: "User email" })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: "123123", description: "User password" })
  password: string;
}
