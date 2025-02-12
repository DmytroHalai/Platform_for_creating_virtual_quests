import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  ValidateNested,
  IsString,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";
import { CreateAnswerDto } from "src/answers/dto/create-answer.dto";
import { QuestionType } from "src/constants/enums/questionType";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTaskDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'https://picsum.photos/seed/1/200', description: 'Task media' })
  media?: string;

  @IsString()
  @ApiProperty({ example: 'What animal is that?', description: 'Task description' })
  description: string;

  @IsNotEmpty()
  @IsEnum(QuestionType)
  @ApiProperty({ example: 'Open answer', description: 'Task question type' })
  question_type: QuestionType;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}
