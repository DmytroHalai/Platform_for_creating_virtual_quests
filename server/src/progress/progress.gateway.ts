import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ProgressService } from "./progress.service";
import { QuestsService } from "src/quests/quests.service";
import { ProgressStatus } from "src/constants/enums/progressStatus";

@WebSocketGateway({
  cors: { origin: "*" },
})
export class ProgressGateway {
  @WebSocketServer()
  server: Server;
  private timers: Map<string, NodeJS.Timeout> = new Map();

  constructor(
    private readonly progressService: ProgressService,
    private readonly questsService: QuestsService
  ) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    const userId = client.handshake.query.userId;
    if (userId) {
      client.data.userId = userId;
      console.log(`User ${userId} connected`);
    }
  }

  @SubscribeMessage("joinWatcherRoom")
  handleJoinWatcherRoom(
    @MessageBody() data: { userId: number },
    @ConnectedSocket() client: Socket
  ) {
    const watchRoom = `watch_${data.userId}`;
    client.join(watchRoom);
    console.log(`User ${data.userId} is now watching.`);

    this.sendCurrentProgressToClient(data.userId, client);
  }

  @SubscribeMessage("startQuest")
  async handleStartQuest(
    @MessageBody() data: { userId: number; questId: number },
    @ConnectedSocket() client: Socket
  ) {
    const quest = await this.questsService.findOneById(data.questId);
    if (!quest) {
      throw new Error("Quest not found");
    }

    const timeLimit: number = +quest.time * 60;

    const progress = await this.progressService.startQuest(
      data.userId,
      data.questId,
      timeLimit
    );
    const room = `quest_${data.questId}`;
    client.join(room);

    client.data.userId = data.userId;
    client.data.questId = data.questId;

    this.server.to(room).emit("questStarted", progress);

    let remaining: number = timeLimit;
    const timer = setInterval(async () => {
      remaining--;

      this.server.to(room).emit("timerUpdate", { remaining });
      this.server.to(`watch_${data.userId}`).emit("timerUpdate", { remaining });

      await this.progressService.updateProgress(
        data.userId,
        data.questId,
        remaining
      );

      if (remaining <= 0) {
        clearInterval(timer);
        await this.progressService.updateProgress(
          data.userId,
          data.questId,
          0,
          ProgressStatus.FINISHED
        );
        this.server.to(room).emit("timeUp", { questId: data.questId });
      }
    }, 1000);

    this.timers.set(`${data.userId}_${data.questId}`, timer);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const data = client.data;

    if (data) {
      const timerKey = `${data.userId}_${data.questId}`;

      const timer = this.timers.get(timerKey);
      if (timer) {
        clearInterval(timer);
        this.timers.delete(timerKey);
      }

      this.progressService.updateProgress(
        data.userId,
        data.questId,
        0,
        ProgressStatus.FINISHED
      );
    }
  }

  private sendCurrentProgressToClient(userId: number, client: Socket) {
    this.progressService.getCurrentProgress(userId).then((progress) => {
      if (progress) {
        client.emit("currentProgress", {
          remainingTime: progress.remainingTime,
          status: progress.status,
        });
      }
    });
  }
}
