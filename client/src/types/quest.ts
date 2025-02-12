import { Category } from '../constants/categorys';

interface IQuest {
  // id: number;
  // image: string;
  // title: string;
  // authorId: number;

  // description: string;
  // timeInMinutes: number;
  // categoryId: number;
  // // rate: number; // enum?
  // createdAt: string;
  // ratingsIds: number[];
  // tasksIds: number[];

  quest_id: number;
  title: string;
  description: string;
  photo: string;
  ratings: { rating: number }[];
  category: string;
  time: number;
}

export default IQuest;
