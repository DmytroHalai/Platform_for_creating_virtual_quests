import { QuestionType } from 'src/constants/enums/quustionType';

export class CreateTaskDto {
  title: string;
  media: string;
  description: string;
  question_type: QuestionType;
}
