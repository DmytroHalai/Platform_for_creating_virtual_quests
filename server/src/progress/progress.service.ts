import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { REPOSITORY } from "src/constants/enums/repositories";
import { Progress } from "./entities/progress.entity";
import { Repository } from "typeorm";
import { ProgressStatus } from "src/constants/enums/progressStatus";
import { User } from "src/users/entities/user.entity";
import { Quest } from "src/quests/entities/quest.entity";

@Injectable()
export class ProgressService {
  constructor(
    @Inject(REPOSITORY.PROGRESS)
    private progressRepository: Repository<Progress>
  ) {}

  async startQuest(
    userId: number,
    questId: number,
    timeLimit: number
  ): Promise<Progress> {
    let progress = await this.progressRepository.findOne({
      where: {
        user: { user_id: userId },
        quest: { quest_id: questId },
      },
    });

    if (!progress) {
      progress = this.progressRepository.create({
        user: { user_id: userId } as User,
        quest: { quest_id: questId } as Quest,
        status: ProgressStatus.STARTED,
        remainingTime: timeLimit,
      });
    } else {
      progress.status = ProgressStatus.STARTED;
      progress.remainingTime = timeLimit;
    }

    return await this.progressRepository.save(progress);
  }

  async updateProgress(
    userId: number,
    questId: number,
    remainingTime: number,
    status?: ProgressStatus
  ): Promise<Progress> {
    const progress = await this.progressRepository.findOne({
      where: {
        user: { user_id: userId },
        quest: { quest_id: questId },
      },
    });

    if (!progress) {
      throw new Error("Progress not found");
    }

    if (status !== undefined) {
      progress.status = status;
    }

    if (remainingTime !== null) {
      progress.remainingTime = remainingTime;
    }
    return await this.progressRepository.save(progress);
  }

  async getCurrentProgress(
    questId: number
  ): Promise<{ remainingTime: number; status: ProgressStatus }> {
    const progress = await this.progressRepository.findOne({
      where: {
        quest: { quest_id: questId },
      },
    });

    if (progress) {
      return {
        remainingTime: progress.remainingTime,
        status: progress.status,
      };
    }

    return {
      remainingTime: 0,
      status: ProgressStatus.NOT_STARTED,
    };
  }
}
