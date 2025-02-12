import { IsNotEmpty, IsString, IsBoolean } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'snake', description: 'Answer title' })
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: 'true', description: 'Is that a correct answer' })
  is_correct: boolean;
}
