interface ITask {
  id: number;
  questId: number;
  title: string;
  media: string;
  desc: string;
  questionType: string; // enum
  answersIds: number[];
}

export default ITask;