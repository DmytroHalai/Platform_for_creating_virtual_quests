import { DataSource } from "typeorm";
import { DATA_SOURCE } from "src/constants/dataSource/dataSource";
import { REPOSITORY } from "src/constants/enums/repositories";
import { Rating } from "./entities/rating.entity";

export const ratingProviders = [
  {
    provide: REPOSITORY.RATING,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Rating),
    inject: [DATA_SOURCE],
  },
];
