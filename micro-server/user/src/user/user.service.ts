import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';

@Injectable()
export class UserService {
  constructor(@InjectInMemoryDBService('user') private readonly db: InMemoryDBService<User>) {
    this.db.create({
      username: 'a',
      password: 'a',
    });
  }
  async findOne(username: string): Promise<User | undefined> {
    const users = this.db.query((user) => user.username === username);
    return users.length > 0 ? users[0] : undefined;
  }
}
