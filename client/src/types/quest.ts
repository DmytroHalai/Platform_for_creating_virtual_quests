interface IQuest {
  id: number;
  authorId: number;
  title: string;
  photo: string;
  descr: string;
  timeInMinutes: number;
  categoryId: number;
  // rate: number; // enum?
  createdAt: string;
  ratingsIds: number[];
  tasksIds: number[];
}

export default IQuest;
