import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { ratingProviders } from './rating.providers';
import { DatabaseModule } from 'src/database/database.module';
import { questProviders } from 'src/quests/quests.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RatingController],
  providers: [RatingService, ...ratingProviders, ...questProviders],
})
export class RatingModule {}
