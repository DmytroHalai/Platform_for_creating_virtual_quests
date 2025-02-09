import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { QuestsService } from 'src/quests/quests.service';

@WebSocketGateway({ cors: { origin: '*', methods: ['GET', 'POST'] } })
export class QuestGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly questService: QuestsService) {}

  handleConnection(client: Socket) {
    console.log(`User ${client.id} connect`);
  }

  handleDisconnect(client: Socket) {
    console.log(`User ${client.id} disconnect`);
  }

  @SubscribeMessage('user_progress')
  handleCustomEvent(
    @MessageBody() id: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Получено user_progress: ${id}`);
    const response = `Ответ на user_progress: ${id.toUpperCase()}`;
    client.emit('user_progress_response', response);
  }
}
