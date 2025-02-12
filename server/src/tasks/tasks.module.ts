import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { DatabaseModule } from "src/database/database.module";
import { taskProviders } from "./tasks.providers";
import { AnswersModule } from "src/answers/answers.module";

@Module({
  imports: [DatabaseModule, AnswersModule],
  providers: [TasksService, ...taskProviders],
  exports: [TasksService],
})
export class TasksModule {}
