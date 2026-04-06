import { RedisModule } from '@app/framework/redis/redis.module';
import { SECRET_TOKEN, Secret } from '../config';

export const CACHE_TOKENS = {
  PRIMARY: Symbol('PRIMARY'),
};

export const RedisConnection = () =>
  RedisModule.forRootAsync({
    provide: CACHE_TOKENS.PRIMARY,
    useFactory: (secret: Secret) => ({
      host: secret.REDIS_HOST,
      port: secret.REDIS_PORT,
    }),
    inject: [SECRET_TOKEN],
  });
