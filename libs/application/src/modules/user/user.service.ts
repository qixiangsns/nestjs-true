import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor() {}

  onModuleInit() {
    this.logger.log('UserService initialized');
  }

  sayHello() {
    return 'Hello World!';
  }
}
