import { Controller, UseGuards, Get, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { User } from './user.entity';
import { MyAuthGuard } from '../guard/MyAuthGuard';
import { UserWsGateway } from './user-ws.gateway';
import {didYouKnow} from "./constants";

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userWsGateway: UserWsGateway,
  ) {}

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any): Promise<User> {
    return this.userService.findOne(data.username);
  }

  @UseGuards(MyAuthGuard)
  @Get('greet')
  async greet(): Promise<string> {
    return 'Greetings authenticated user BRO';
  }

  @EventPattern('recipe-saved-event')
  async handleRecipeSavedEvent(data: Record<string, unknown>) {
    console.log('User microservices did receive recipe saved event: ', data);
    const random = Math.floor(Math.random() * 8);
    this.userWsGateway.broadcast({
      event: 'updated',
      payload: didYouKnow[random],
    });
  }
}
