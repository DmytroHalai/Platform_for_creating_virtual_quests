import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('increment')
  answer_id: number;

  @Column('text')
  answer: string;

  @Column('boolean')
  is_correct: boolean;

  @ManyToOne(() => Task, (task) => task.answers, { onDelete: 'CASCADE' })
  task: Task;

  @CreateDateColumn()
  created_at: Date;
}
