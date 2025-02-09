import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { REPOSITORY } from 'src/constants/enums/repositories';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { AnswersService } from 'src/answers/answers.service';

@Injectable()
export class TasksService {
  constructor(
    @Inject(REPOSITORY.TASK)
    private tasksRepository: Repository<Task>,
    private readonly answersService: AnswersService,
  ) {}

  async create(
    createTaskDtos: CreateTaskDto[],
    questId: number,
    media?: Express.Multer.File[],
  ) {
    const tasks = await Promise.all(
      createTaskDtos.map(async (task, index) => {
        // Если для данной задачи есть медиа файл, прикрепляем путь к нему
        if (media && media[index]) {
          task.media = `/uploads/tasks/${media[index].filename}`;
        }

        // Создаем сущность задачи с привязкой к квесту
        const createdTask = this.tasksRepository.create({
          ...task,
          quest: { quest_id: questId },
        });

        // Сохраняем задачу, чтобы получить её идентификатор (task_id)
        const savedTask = await this.tasksRepository.save(createdTask);

        // Если в DTO есть ответы, создаем их и прикрепляем к задаче
        if (task.answers && Array.isArray(task.answers)) {
          // Метод answersService.create должен принимать массив CreateAnswerDto и task_id
          const createdAnswers = await this.answersService.create(
            task.answers,
            savedTask.task_id,
          );
          // Прикрепляем созданные ответы к задаче (если требуется для дальнейшей обработки)
          savedTask.answers = createdAnswers;
        }

        return savedTask;
      }),
    );

    return tasks;
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
