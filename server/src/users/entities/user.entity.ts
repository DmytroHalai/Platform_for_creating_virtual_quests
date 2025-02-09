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

  @Column('text')
  role: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @OneToMany(() => Quest, (quest) => quest.author)
  quests: Quest[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
