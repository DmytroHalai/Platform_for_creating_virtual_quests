import { Answer } from "src/answers/entities/answer.entity";
import { QuestionType } from "src/constants/enums/questionType";
import { Progress } from "src/progress/entities/progress.entity";
import { Quest } from "src/quests/entities/quest.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("increment")
  task_id: number;

  @Column({ nullable: true })
  media: string;

  @Column("text")
  description: string;

  @Column({ type: "enum", enum: QuestionType })
  question_type: QuestionType;

  @ManyToOne(() => Quest, (quest) => quest.tasks, { onDelete: "CASCADE" })
  quest: Quest;

  @OneToMany(() => Answer, (answer) => answer.task)
  answers: Answer[];

  @OneToMany(() => Progress, (progress) => progress.task)
  progress: Progress[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
