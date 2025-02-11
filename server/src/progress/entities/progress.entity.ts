import { ProgressStatus } from "src/constants/enums/progressStatus";
import { Quest } from "src/quests/entities/quest.entity";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("progress")
export class Progress {
  @PrimaryGeneratedColumn("increment")
  progress_id: number;

  @Column({
    type: "enum",
    enum: ProgressStatus,
    default: ProgressStatus.STARTED,
  })
  status: ProgressStatus;

  @Column({ type: "int", nullable: true, default: 0 })
  remainingTime: number;

  @ManyToOne(() => User, (user) => user.progress, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Quest, (quest) => quest.progress, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "quest_id" })
  quest: Quest;
}
