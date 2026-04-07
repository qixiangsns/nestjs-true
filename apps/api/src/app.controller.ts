import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { SECRET_TOKEN, Secret } from '@app/application/config';
import { AppService } from './app.service';
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    @Inject(SECRET_TOKEN) private readonly secret: Secret,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello() {
    this.logger.log(
      { deepObj: { deepObj: { deepObj: { age: 18, options: { deepObj: { deeeeep: 99 } } } } } },
      'Hello World!',
    );

    return {
      secret: 'XXXXXX',
    };
  }
}
