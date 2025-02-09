import { Module } from '@nestjs/common';
import { QuestsModule } from 'src/quests/quests.module';
import { QuestGateway } from './events.gateway';


@Module({ imports: [QuestsModule], providers: [QuestGateway] })
export class WebsocketModule {}
