import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'auth',
      port: 4001,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
  Logger.log('Auth microservice running');
}
bootstrap();
