import { CreateAnswerDto } from './dto/create-answer.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants/enums/repositories';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswersService {
  constructor(
    @Inject(REPOSITORY.ANSWER)
    private answersRepository: Repository<Answer>,
  ) {}

  async create(createAnswerDtos: CreateAnswerDto[], task_id: number) {
    const answers = createAnswerDtos.map((answer) => {
      return this.answersRepository.create({
        ...answer,
        task: { task_id: task_id },
      });
    });

    return await this.answersRepository.save(answers);
  }
}
