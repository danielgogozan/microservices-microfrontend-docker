import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const admin = require('firebase-admin');
const serviceAccount = require('../recipes-manager-7fc9a-firebase-adminsdk-q1s5z-c786c35e19.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/* eslint @typescript-eslint/no-var-requires: "off" */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'recipeserver',
      port: 4020,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3012);
  Logger.log('Recipe microservice running');
}
bootstrap();
