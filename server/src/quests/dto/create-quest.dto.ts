import { QuestCategory } from 'src/constants/enums/questCategory';

export class CreateQuestDto {
  title: string;
  photo: string;
  description: string;
  time: string;
  category: QuestCategory;
  rate: number;
}
