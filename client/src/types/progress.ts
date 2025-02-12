interface IProgress {
  id: number;
  userId: number;
  questId: number;
  status: "started" | "finished";
  taskId: number;
  startTime: string;
  endTime: string;
}

export default IProgress;