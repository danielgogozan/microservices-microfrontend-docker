import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { UserWsGateway } from './user-ws.gateway';
@Module({
  imports: [
    InMemoryDBModule.forFeature('user', {}),
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'auth',
          port: 4001,
        },
      },
    ]),
  ],
  providers: [UserService, UserWsGateway],
  controllers: [UserController],
})
export class UserModule {}
