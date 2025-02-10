import { Progress } from 'src/progress/entities/progress.entity';
import { Quest } from 'src/quests/entities/quest.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  user_id: number;

  @Column('text')
  email: string;

  @Column('text')
  username: string;

  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  gender: string;

  @Column('text', { nullable: true })
  dateOfBirth: string;

  @Column('text', { nullable: true })
  avatar: string;

  @Column('text', { default: 'user' })
  role: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @OneToMany(() => Quest, (quest) => quest.author)
  quests: Quest[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => Progress, (progress) => progress.user)
  progress: Progress[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
