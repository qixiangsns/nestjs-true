import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ApplicationModule } from '@app/application';
import { ZodValidationPipe, ZodSerializerInterceptor } from 'nestjs-zod';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: ,
    // },
  ],
})
export class AppModule {}
