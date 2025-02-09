import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { Repository } from 'typeorm';
import { REPOSITORY } from 'src/constants/enums/repositories';
import { Quest } from './entities/quest.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class QuestsService {
  constructor(
    @Inject(REPOSITORY.QUEST)
    private questsRepository: Repository<Quest>,
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
  ) {}

  async create(
    createQuestDto: CreateQuestDto,
    userId: number,
    photo?: Express.Multer.File,
  ) {
    const author = await this.usersService.findById(userId);
    if (!author) {
      throw new NotFoundException('User not found');
    }

    const quest = this.questsRepository.create({
      ...createQuestDto,
      photo: photo ? `/uploads/quests/${photo.filename}` : undefined,
      author: { user_id: userId },
    });
    await this.questsRepository.save(quest);

    return quest;
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
