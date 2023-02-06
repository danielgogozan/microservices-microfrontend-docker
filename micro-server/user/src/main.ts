import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Put this before connecting microservies
  app.useWebSocketAdapter(new WsAdapter(app));

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'user',
      port: 4010,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3010);
  Logger.log('User microservice running');
}
bootstrap();
