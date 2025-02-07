import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { QuestsModule } from './quests/quests.module';
import { TasksModule } from './tasks/tasks.module';
import { ProgressModule } from './progress/progress.module';
import { RatingModule } from './rating/rating.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { CookieService } from './cookie/cookie.service';
import { CookieModule } from './cookie/cookie.module';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    UsersModule,
    QuestsModule,
    TasksModule,
    ProgressModule,
    RatingModule,
    ChatModule,
    AuthModule,
    CookieModule,
    EmailModule,
    ScheduleModule,
  ],
  providers: [CookieService],
})
export class AppModule {}
