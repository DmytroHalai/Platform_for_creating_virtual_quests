import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { REPOSITORY } from "src/constants/enums/repositories";
import { Repository } from "typeorm";
import { Quest } from "src/quests/entities/quest.entity";
import { Rating } from "./entities/rating.entity";
import { QuestNotFoundException } from "src/exceptions/custom.exceptions";

@Injectable()
export class RatingService {
  constructor(
    @Inject(REPOSITORY.RATING)
    private ratingRepository: Repository<Rating>,
    @Inject(REPOSITORY.QUEST)
    private questsRepository: Repository<Quest>
  ) {}

  async create(
    createRatingDto: CreateRatingDto,
    user_id: number,
    quest_id: number
  ) {
    const quest = await this.questsRepository.findOne({
      where: { quest_id: quest_id },
    });
    if (!quest) throw new QuestNotFoundException();

    const rating = this.ratingRepository.create({
      ...createRatingDto,
      user: { user_id: user_id },
      quest: { quest_id: quest_id },
    });
    return await this.ratingRepository.save(rating);
  }
}
