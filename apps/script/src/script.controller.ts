import { Controller, Get } from '@nestjs/common';
import { ScriptService } from './script.service';

@Controller()
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}

  @Get()
  getHello(): string {
    return this.scriptService.getHello();
  }
}
