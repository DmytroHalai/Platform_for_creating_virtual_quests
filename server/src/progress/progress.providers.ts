import { DataSource } from "typeorm";
import { DATA_SOURCE } from "src/constants/dataSource/dataSource";
import { REPOSITORY } from "src/constants/enums/repositories";
import { Progress } from "./entities/progress.entity";

export const progressProviders = [
  {
    provide: REPOSITORY.PROGRESS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Progress),
    inject: [DATA_SOURCE],
  },
];
