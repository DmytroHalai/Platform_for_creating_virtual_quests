import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { questProviders } from './quests.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/users/users.providers';
import { taskProviders } from 'src/tasks/tasks.providers';
import { TasksModule } from 'src/tasks/tasks.module';
import { UploadModule } from 'src/upload/upload.module';
import { AnswersModule } from 'src/answers/answers.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    TasksModule,
    UploadModule,
    AnswersModule,
  ],
  controllers: [QuestsController],
  providers: [
    QuestsService,
    ...questProviders,
    ...userProviders,
    ...taskProviders,
  ],
})
export class QuestsModule {}
