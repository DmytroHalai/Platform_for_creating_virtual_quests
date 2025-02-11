import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsNotEmpty()
  @IsBoolean()
  is_correct: boolean;
}
