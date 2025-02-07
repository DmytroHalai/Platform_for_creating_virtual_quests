import { DataSource } from 'typeorm';
import { DATA_SOURCE } from 'src/constants/dataSource/dataSource';
import { REPOSITORY } from 'src/constants/enums/repositories';
import { Task } from './entities/task.entity';

export const taskProviders = [
  {
    provide: REPOSITORY.TASK,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: [DATA_SOURCE],
  },
];
