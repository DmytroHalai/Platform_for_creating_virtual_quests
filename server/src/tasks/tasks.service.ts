import { Inject, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { REPOSITORY } from "src/constants/enums/repositories";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { AnswersService } from "src/answers/answers.service";
import { PATH } from "src/constants/enums/filePath";

@Injectable()
export class TasksService {
  constructor(
    @Inject(REPOSITORY.TASK)
    private tasksRepository: Repository<Task>,
    private readonly answersService: AnswersService
  ) {}

  async create(
    createTaskDtos: CreateTaskDto[],
    questId: number,
    media?: Express.Multer.File[]
  ) {
    const tasks = await Promise.all(
      createTaskDtos.map(async (task, index) => {
        if (media && media[index]) {
          task.media = `${PATH.DB_TASK}/${media[index].filename}`;
        }

        const createdTask = this.tasksRepository.create({
          ...task,
          quest: { quest_id: questId },
        });

        const savedTask = await this.tasksRepository.save(createdTask);

        if (task.answers && Array.isArray(task.answers)) {
          const createdAnswers = await this.answersService.create(
            task.answers,
            savedTask.task_id
          );
          savedTask.answers = createdAnswers;
        }

        return savedTask;
      })
    );

    return tasks;
  }
}
