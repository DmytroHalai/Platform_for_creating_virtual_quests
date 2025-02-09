import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { REPOSITORY } from 'src/constants/enums/repositories';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @Inject(REPOSITORY.TASK)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(
    createTaskDtos: CreateTaskDto[],
    questId: number,
    media?: Express.Multer.File[],
  ) {
    const tasks = createTaskDtos.map((task, index) => {
      if (media && media[index]) {
        task.media = `/uploads/tasks/${media[index].filename}`;
      }

      return this.tasksRepository.create({
        ...task,
        quest: { quest_id: questId },
      });
    });

    return await this.tasksRepository.save(tasks);
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
