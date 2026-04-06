import { Controller, Get, Inject } from '@nestjs/common';
import { SECRET_TOKEN, Secret } from '@app/application/config';
@Controller()
export class AppController {
  constructor(@Inject(SECRET_TOKEN) private readonly secret: Secret) {}

  @Get()
  getHello() {
    return {
      secret: 'XXXXXX',
    };
  }
}
