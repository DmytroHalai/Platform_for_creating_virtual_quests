import { QuestCategory } from 'src/constants/enums/questCategory';
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

  @Column('text')
  photo: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
