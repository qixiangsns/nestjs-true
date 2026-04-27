import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Env, ENV_TOKEN } from '@app/application/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '@package';
import { createApiReference } from '@app/framework/scalar';
import { format, fromUnixTime, parseISO } from 'date-fns';
import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const env = app.get<Env>(ENV_TOKEN);
  app.useLogger(app.get(PinoLogger));
  app.flushLogs();

  const logger = new Logger('Server');

  setupApiDocumentation(app);

  app.listen(env.PORT).then(() => {
    logger.debug({ port: env.PORT }, `Server is running`);
  });
}

function setupApiDocumentation(app: INestApplication) {
  const openApiDoc = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Project API')
      .setDescription('This is a documentation for the project API')
      .setVersion(version)
      .build(),
  );

  app.use(
    '/reference',
    createApiReference({
      content: openApiDoc,
      theme: 'deepSpace',
      showDeveloperTools: 'never',
      hideModels: true,
      mcp: {
        disabled: true,
      },
      hideClientButton: true,
      agent: {
        disabled: true,
      },
    }),
  );
}
bootstrap();
