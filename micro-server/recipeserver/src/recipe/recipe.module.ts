import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
@Module({
  imports: [
    InMemoryDBModule.forFeature('recipe', {}),
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
    ClientsModule.register([
      {
        name: 'USER_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'user',
          port: 4010,
        },
      },
    ]),
  ],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
