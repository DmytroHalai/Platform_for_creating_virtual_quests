import { DataSource } from 'typeorm';
import { DATA_SOURCE } from 'src/constants/dataSource/dataSource';
import { REPOSITORY } from 'src/constants/enums/repositories';
import { Answer } from './entities/answer.entity';

export const answerProviders = [
  {
    provide: REPOSITORY.ANSWER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Answer),
    inject: [DATA_SOURCE],
  },
];
