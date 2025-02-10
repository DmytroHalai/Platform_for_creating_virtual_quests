import { QuestCategory } from 'src/constants/enums/questCategory';
import { Progress } from 'src/progress/entities/progress.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('quests')
export class Quest {
  @PrimaryGeneratedColumn('increment')
  quest_id: number;

  @Column('text')
  title: string;

  @Column({ type: 'text', nullable: true })
  photo: string | null;

  @Column('text')
  description: string;

  @Column('text')
  time: string;

  @Column({ type: 'enum', enum: QuestCategory })
  category: QuestCategory;

  @ManyToOne(() => User, (user) => user.quests, { onDelete: 'CASCADE' })
  author: User;

  @OneToMany(() => Rating, (rating) => rating.quest)
  ratings: Rating[];

  @OneToMany(() => Task, (task) => task.quest)
  tasks: Task[];

  @OneToMany(() => Progress, (progress) => progress.quest)
  progress: Progress[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
