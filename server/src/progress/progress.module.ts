import { Module } from "@nestjs/common";
import { ProgressService } from "./progress.service";
import { progressProviders } from "./progress.providers";
import { DatabaseModule } from "src/database/database.module";
import { ProgressGateway } from "./progress.gateway";
import { QuestsModule } from "src/quests/quests.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [DatabaseModule, QuestsModule, UsersModule],
  providers: [ProgressService, ProgressGateway, ...progressProviders],
})
export class ProgressModule {}
