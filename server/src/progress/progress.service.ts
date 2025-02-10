import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REPOSITORY } from 'src/constants/enums/repositories';
import { Progress } from './entities/progress.entity';
import { Repository } from 'typeorm';
import { ProgressStatus } from 'src/constants/enums/progressStatus';
import { User } from 'src/users/entities/user.entity';
import { Quest } from 'src/quests/entities/quest.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Injectable()
export class ProgressService {
  constructor(
    @Inject(REPOSITORY.PROGRESS)
    private progressRepository: Repository<Progress>,
  ) {}

  async startQuest(
    userId: number,
    questId: number,
    timeLimit: number,
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
        task: null,
      });
    } else {
      progress.status = ProgressStatus.STARTED;
      progress.remainingTime = timeLimit;
      progress.task = null;
    }

    return await this.progressRepository.save(progress);
  }

  async updateProgress(
    userId: number,
    questId: number,
    taskId: number | null,
    remainingTime: number,
    status?: ProgressStatus,
  ): Promise<Progress> {
    const progress = await this.progressRepository.findOne({
      where: {
        user: { user_id: userId },
        quest: { quest_id: questId },
      },
    });

    if (!progress) {
      throw new NotFoundException(
        'Progress record not found. Start quest first.',
      );
    }

    progress.task = taskId ? ({ task_id: taskId } as Task) : null;
    progress.remainingTime = remainingTime;
    if (status) {
      progress.status = status;
    }

    return await this.progressRepository.save(progress);
  }
}
