import { NestFactory } from '@nestjs/core';
import { ScriptModule } from './script.module';

async function bootstrap() {
  const app = await NestFactory.create(ScriptModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
