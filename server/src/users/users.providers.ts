import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { DATA_SOURCE } from 'src/constants/dataSource/dataSource';
import { REPOSITORY } from 'src/constants/enums/repositories';

export const userProviders = [
  {
    provide: REPOSITORY.USER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
