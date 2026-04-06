import { RedisModule } from '@app/framework/redis/redis.module';
import { SECRET_TOKEN, Secret } from '../config/secret.schema';

export const CACHE_TOKENS = {
  PRIMARY: Symbol('PRIMARY'),
};

export const RedisConnection = () =>
  RedisModule.forRootAsync({
    provide: CACHE_TOKENS.PRIMARY,
    useFactory: (secret: Secret) => {
      const { REDIS_HOST, REDIS_PORT } = secret;

      return {
        host: REDIS_HOST,
        port: REDIS_PORT,
      };
    },
    inject: [SECRET_TOKEN],
  });
