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

export class CreateTaskDto {
  @IsOptional()
  @IsString()
  media?: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(QuestionType)
  question_type: QuestionType;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}
