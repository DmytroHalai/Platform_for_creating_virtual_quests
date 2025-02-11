import { CreateAnswerDto } from "src/answers/dto/create-answer.dto";
import { QuestionType } from "src/constants/enums/questionType";

export class CreateTaskDto {
  media?: string;
  description: string;
  question_type: QuestionType;
  answers: CreateAnswerDto[];
}
