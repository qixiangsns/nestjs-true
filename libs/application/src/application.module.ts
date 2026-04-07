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
import { LoggerModule } from 'nestjs-pino';
import { getPinoOptions } from '@app/framework/logger/pino-logger.config';
import { UserModule } from './modules/user/user.module';

const FeatureModules = [UserModule];
const MongoModules = [MongoDbConnection()];
const RedisModules = [RedisConnection()];
const PulsarModules = [PulsarConnection()];
const ClickhouseModules = [ClickhouseConnection()];
const SecretsModules = [
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
];
const LoggerModules = [
  LoggerModule.forRootAsync({
    useFactory: (env: Env) => ({
      pinoHttp: getPinoOptions(env.NODE_ENV === 'production'),
    }),
    inject: [ENV_TOKEN],
  }),
];

@Module({
  imports: [
    ConfigModule.forRoot(),
    ...SecretsModules,
    ...LoggerModules,
    ...MongoModules,
    ...RedisModules,
    ...PulsarModules,
    ...ClickhouseModules,
    ...FeatureModules,
  ],
  exports: [...FeatureModules],
})
export class ApplicationModule {}
