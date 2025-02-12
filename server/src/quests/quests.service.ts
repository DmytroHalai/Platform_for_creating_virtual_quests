import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateQuestDto } from "./dto/create-quest.dto";
import { Repository } from "typeorm";
import { REPOSITORY } from "src/constants/enums/repositories";
import { Quest } from "./entities/quest.entity";
import { UsersService } from "src/users/users.service";
import { PATH } from "src/constants/enums/filePath";
import { UserNotFoundException } from "src/exceptions/custom.exceptions";

@Injectable()
export class QuestsService {
  constructor(
    @Inject(REPOSITORY.QUEST)
    private questsRepository: Repository<Quest>,
    private readonly usersService: UsersService
  ) {}

  async create(
    createQuestDto: CreateQuestDto,
    userId: number,
    photo?: Express.Multer.File
  ) {
    const author = await this.usersService.findById(userId);
    if (!author) throw new UserNotFoundException();

    const quest = this.questsRepository.create({
      ...createQuestDto,
      photo: photo ? `${PATH.DB_QUEST}/${photo.filename}` : undefined,
      author: { user_id: userId },
    });
    await this.questsRepository.save(quest);
    return quest;
  }

  async countAll() {
    return await this.questsRepository.count();
  }

  async findAllByAuthor(id: number) {
    return await this.questsRepository.find({
      where: { author: { user_id: id } },
    });
  }

  async findOneById(questId: number) {
    return await this.questsRepository.findOne({
      where: { quest_id: questId },
    });
  }

  async findById(id: number) {
    return await this.questsRepository.find({
      where: { quest_id: id },
      relations: ["tasks.answers"],
    });
  }

  async findAll() {
    return await this.questsRepository.find({
      select: {
        ratings: {
          rating: true,
        },
      },
      relations: ["ratings"],
    });
  }
}
