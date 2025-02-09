import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { Repository } from 'typeorm';
import { REPOSITORY } from 'src/constants/enums/repositories';
import { Quest } from './entities/quest.entity';
import { User } from 'src/users/entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Injectable()
export class QuestsService {
  constructor(
    @Inject(REPOSITORY.QUEST)
    private questsRepository: Repository<Quest>,
    @Inject(REPOSITORY.USER)
    private usersRepository: Repository<User>,
    @Inject(REPOSITORY.TASK)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createQuestDto: CreateQuestDto, userId: number) {
    const author = await this.usersRepository.findOneBy({
      user_id: userId,
    });

    if (!author) {
      throw new NotFoundException('User not found');
    }
    const quest = this.questsRepository.create({
      ...createQuestDto,
      author: { user_id: userId },
    });
    await this.questsRepository.save(quest);

    const tasks = createQuestDto.tasks.map((task) => {
      return this.tasksRepository.create({
        ...task,
        quest: { quest_id: quest.quest_id },
      });
    });

    await this.tasksRepository.save(tasks);

    return { ...quest, tasks };
  }

  findAll() {
    return `This action returns all quests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quest`;
  }

  update(id: number, updateQuestDto: UpdateQuestDto) {
    return `This action updates a #${id} quest`;
  }

  remove(id: number) {
    return `This action removes a #${id} quest`;
  }
}
