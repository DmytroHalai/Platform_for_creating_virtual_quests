import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { Repository } from 'typeorm';
import { REPOSITORY } from 'src/constants/enums/repositories';
import { Quest } from './entities/quest.entity';
import { UsersService } from 'src/users/users.service';
import { uploadQuestsPath } from 'src/constants/filePath/upload';

@Injectable()
export class QuestsService {
  constructor(
    @Inject(REPOSITORY.QUEST)
    private questsRepository: Repository<Quest>,
    private readonly usersService: UsersService,
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
      photo: photo ? `${uploadQuestsPath}/${photo.filename}` : undefined,
      author: { user_id: userId },
    });
    await this.questsRepository.save(quest);

    return quest;
  }

  // findAll() {
  //   return `This action returns all quests`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} quest`;
  // }

  // update(id: number, updateQuestDto: UpdateQuestDto) {
  //   return `This action updates a #${id} quest`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} quest`;
  // }
  // Почати квест

  async updateProgress(userId: number, questId: number, progress: number) {
    const quest = await this.questsRepository.findOne({
      where: { quest_id: questId },
    });
    if (!quest) throw new Error('Квест не найден');

    if (progress >= 100) {
    }

    await this.questsRepository.save(quest);
  }

  async findAllByAuthor(id: number) {
    return await this.questsRepository.find({
      where: { author: { user_id: id } },
    });
  }

  async countAll() {
    const activeUserCount = await this.questsRepository.count();
    return activeUserCount;
  }

  async findAll() {
    return await this.questsRepository.find({
      select: {
        ratings: {
          rating: true,
        },
      },
      relations: ['ratings'],
    });
  }
}
