import {
  DynamicModule,
  Module,
  ModuleMetadata,
  Provider,
  InjectionToken,
  OptionalFactoryDependency,
} from '@nestjs/common';
import { ClickHouseClient, createClient } from '@clickhouse/client';
import { NodeClickHouseClientConfigOptions } from '@clickhouse/client/dist/config';

interface ClickhouseModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  connectionName: symbol | string;
  useFactory?: (
    ...args: unknown[]
  ) => Promise<NodeClickHouseClientConfigOptions> | NodeClickHouseClientConfigOptions;
  inject?: (InjectionToken | OptionalFactoryDependency)[];
}

@Module({})
export class ClickhouseModule {
  static forRootAsync(options: ClickhouseModuleAsyncOptions): DynamicModule {
    const provider: Provider<ClickHouseClient> = {
      provide: options.connectionName,
      useFactory: async (...args: unknown[]): Promise<ClickHouseClient> => {
        const connectionOptions = await options.useFactory?.(...args);
        const client = createClient(connectionOptions);
        client
          .ping()
          .then(() => {
            console.log(`Connected to Clickhouse: ${connectionOptions?.url}`);
          })
          .catch((error) => {
            console.error(`Error connecting to Clickhouse: `, error);
          });
        return client;
      },
      inject: options.inject ?? [],
    };

    return {
      module: ClickhouseModule,
      providers: [provider],
      exports: [provider],
      imports: options.imports ?? [],
      global: true,
    };
  }
}
