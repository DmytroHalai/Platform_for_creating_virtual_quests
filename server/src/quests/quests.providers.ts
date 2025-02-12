import { DataSource } from 'typeorm';
import { DATA_SOURCE } from 'src/constants/dataSource/dataSource';
import { REPOSITORY } from 'src/constants/enums/repositories';
import { Quest } from './entities/quest.entity';

export const questProviders = [
  {
    provide: REPOSITORY.QUEST,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Quest),
    inject: [DATA_SOURCE],
  },
];
