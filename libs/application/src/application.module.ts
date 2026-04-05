import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecretsModule } from '@app/framework/secret';
import { SecretSchema, SECRET_TOKEN } from './config/secret.schema';
import { EnvSchema, Env, ENV_TOKEN } from './config/env.schema';

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
      // {
      //   provide: SECRET_TOKEN,
      //   schema: SecretSchema,
      //   useFactory: (env: Env) =>
      //     env.NODE_ENV === 'development'
      //       ? {
      //           providerType: 'env',
      //         }
      //       : {
      //           providerType: 'vault',
      //           vaultToken: env.VAULT_TOKEN,
      //           vaultUrl: env.VAULT_URL,
      //           vaultPath: env.VAULT_PATH,
      //         },

      //   inject: [ENV_TOKEN],
      // },
      // {
      //   provide: SECRET_TOKEN,
      //   schema: SecretSchema,
      //   useFactory: () => ({
      //     providerType: 'aws',
      //     accessKeyId: '123',
      //     secretAccessKey: '123',
      //   }),
      //   inject: [ENV_TOKEN],
      // },
      // {
      //   provide: SECRET_TOKEN,
      //   schema: SecretSchema,
      //   useFactory: () => ({
      //     providerType: 'vault',
      //     vaultToken: '123',
      //     vaultUrl: '123',
      //     vaultPath: '123',
      //   }),
      // },
    ]),
  ],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
