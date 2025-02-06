import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { questProviders } from './quests.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/users/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestsController],
  providers: [QuestsService, ...questProviders, ...userProviders],
})
export class QuestsModule {}
