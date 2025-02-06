import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuestsModule } from './quests/quests.module';
import { TasksModule } from './tasks/tasks.module';
import { ProgressModule } from './progress/progress.module';
import { RatingModule } from './rating/rating.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UsersModule, QuestsModule, TasksModule, ProgressModule, RatingModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
