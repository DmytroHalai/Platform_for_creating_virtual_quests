import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { taskProviders } from './tasks.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [TasksService, ...taskProviders],
  exports: [TasksService],
})
export class TasksModule {}
