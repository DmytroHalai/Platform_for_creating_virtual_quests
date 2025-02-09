import { QuestionType } from 'src/constants/enums/quustionType';
import { Quest } from 'src/quests/entities/quest.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('increment')
  task_id: number;

  @Column('text')
  title: string;

  @Column('text')
  media: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: QuestionType })
  question_type: QuestionType;

  @ManyToOne(() => Quest, (quest) => quest.tasks, { onDelete: 'CASCADE' })
  quest: Quest;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
