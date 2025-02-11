import { Module } from "@nestjs/common";
import { AnswersService } from "./answers.service";
import { DatabaseModule } from "src/database/database.module";
import { answerProviders } from "./answers.providers";

@Module({
  imports: [DatabaseModule],
  providers: [AnswersService, ...answerProviders],
  exports: [AnswersService],
})
export class AnswersModule {}
