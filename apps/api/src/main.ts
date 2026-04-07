import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Env, ENV_TOKEN } from '@app/application/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const env = app.get<Env>(ENV_TOKEN);
  app.useLogger(app.get(PinoLogger));
  app.flushLogs();

  const logger = new Logger('Server');

  await app.listen(env.PORT);
  logger.debug({ port: env.PORT }, `Server is running`);
}
bootstrap();
