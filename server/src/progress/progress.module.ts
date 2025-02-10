import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { progressProviders } from './progress.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ProgressGateway } from './progress.gateway';
import { questProviders } from 'src/quests/quests.providers';
import { QuestsModule } from 'src/quests/quests.module';

@Module({
  imports: [DatabaseModule, QuestsModule],
  controllers: [ProgressController],
  providers: [ProgressService, ProgressGateway, ...progressProviders],
  exports: [ProgressService, ProgressGateway],
})
export class ProgressModule {}
