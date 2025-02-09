import { QuestCategory } from 'src/constants/enums/questCategory';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

export class CreateQuestDto {
  title: string;
  photo?: string;
  description: string;
  time: string;
  category: QuestCategory;
  tasks: CreateTaskDto[];
}
