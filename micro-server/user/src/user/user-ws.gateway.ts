import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OPEN, Server } from 'ws';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class UserWsGateway {
  @WebSocketServer()
  server: Server;

  broadcast(data: any): void {
    console.log('Broadcasting data', data);

    this.server.clients.forEach((client) => {
      if (client.readyState === OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}
