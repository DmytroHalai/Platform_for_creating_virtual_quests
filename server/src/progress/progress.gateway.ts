import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProgressService } from './progress.service';
import { QuestsService } from 'src/quests/quests.service';
import { ProgressStatus } from 'src/constants/enums/progressStatus';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ProgressGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly progressService: ProgressService,
    private readonly questsService: QuestsService,
  ) {}

  @SubscribeMessage('startQuest')
  async handleStartQuest(
    @MessageBody() data: { userId: number; questId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const quest = await this.questsService.findOneById(data.questId);
    if (!quest) {
      throw new Error('Quest not found');
    }

    const timeLimit: number = +quest.time * 60;

    const progress = await this.progressService.startQuest(
      data.userId,
      data.questId,
      timeLimit,
    );
    const room = `quest_${data.questId}`;
    client.join(room);

    this.server.to(room).emit('questStarted', progress);

    let remaining: number = timeLimit;
    const timer = setInterval(async () => {
      remaining--;
      this.server.to(room).emit('timerUpdate', { remaining });
      await this.progressService.updateProgress(
        data.userId,
        data.questId,
        null,
        remaining,
      );
      if (remaining <= 0) {
        clearInterval(timer);
        await this.progressService.updateProgress(
          data.userId,
          data.questId,
          null,
          0,
          ProgressStatus.FINISHED,
        );
        this.server.to(room).emit('timeUp', { questId: data.questId });
      }
    }, 1000);
  }

  @SubscribeMessage('progressUpdate')
  async handleProgressUpdate(
    @MessageBody()
    data: {
      userId: number;
      questId: number;
      taskId: number;
      remainingTime: number;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const progress = await this.progressService.updateProgress(
      data.userId,
      data.questId,
      data.taskId,
      data.remainingTime,
    );
    const room = `quest_${data.questId}`;
    this.server.to(room).emit('progressUpdate', progress);
  }

  @SubscribeMessage('joinQuest')
  handleJoinQuest(
    @MessageBody() data: { userId: number; questId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `quest_${data.questId}`;
    client.join(room);
    console.log(`User ${data.userId} joined room ${room}`);
  }
}
