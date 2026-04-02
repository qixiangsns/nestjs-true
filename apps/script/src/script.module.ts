import { Module } from '@nestjs/common';
import { ScriptController } from './script.controller';
import { ScriptService } from './script.service';

@Module({
  imports: [],
  controllers: [ScriptController],
  providers: [ScriptService],
})
export class ScriptModule {}
