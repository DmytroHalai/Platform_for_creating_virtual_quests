import { Quest } from 'src/quests/entities/quest.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';

@Entity('rating')
@Unique(['user', 'quest'])
export class Rating {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int')
  rating: number;

  @Column('text')
  comment: string;

  @ManyToOne(() => User, (user) => user.ratings, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Quest, (quest) => quest.ratings, { onDelete: 'CASCADE' })
  quest: Quest;

  @CreateDateColumn()
  created_at: Date;
}
