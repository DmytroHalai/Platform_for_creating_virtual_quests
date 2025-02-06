import { QuestCategory } from 'src/constants/enums/questCategory';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('quests')
export class Quest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  photo: string;

  @Column('text')
  description: string;

  @Column('time')
  time: string;

  @Column({ type: 'enum', enum: QuestCategory })
  category: QuestCategory;

  @Column({ type: 'int', default: null })  // another table
  rate: number;

  @ManyToOne(() => User, (user) => user.quests, { onDelete: 'CASCADE' })
  author: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
