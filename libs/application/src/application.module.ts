import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecretsModule } from '@app/framework/secret';
import { SecretSchema, SECRET_TOKEN, EnvSchema, Env, ENV_TOKEN } from './config';
import {
  RedisConnection,
  MongoDbConnection,
  PulsarConnection,
  ClickhouseConnection,
} from './connnections';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SecretsModule.forRoot([
      {
        provide: ENV_TOKEN,
        schema: EnvSchema,
        providerType: 'env',
      },
    ]),
    SecretsModule.forRootAsync([
      {
        provide: SECRET_TOKEN,
        schema: SecretSchema,
        useFactory: (env: Env) => ({
          ...(env.NODE_ENV === 'development'
            ? { providerType: 'env' }
            : {
                providerType: 'vault',
                vaultToken: env.VAULT_TOKEN,
                vaultUrl: env.VAULT_URL,
                vaultPath: env.VAULT_PATH,
              }),
        }),
        inject: [ENV_TOKEN],
      },
    ]),
    RedisConnection(),
    MongoDbConnection(),
    PulsarConnection(),
    ClickhouseConnection(),
  ],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
