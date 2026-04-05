import {
  DynamicModule,
  Module,
  ModuleMetadata,
  OptionalFactoryDependency,
  Provider,
  InjectionToken,
} from '@nestjs/common';
import { Redis, RedisOptions, Cluster, ClusterOptions, ClusterNode } from 'ioredis';

interface RedisModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  connectionName: string | symbol;
  useFactory: (...args: unknown[]) => Promise<RedisOptions> | RedisOptions;
  inject?: (InjectionToken | OptionalFactoryDependency)[];
}

interface RedisClusterOptions {
  clusterOptions: ClusterOptions;
  clusterNodes: ClusterNode[];
}

interface RedisClusterModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  connectionName: string | symbol;
  useFactory: (...args: unknown[]) => Promise<RedisClusterOptions> | RedisClusterOptions;
  inject?: (InjectionToken | OptionalFactoryDependency)[];
}

@Module({})
/**
 * Register a global provider for the Redis client.
 */
export class RedisModule {
  static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    const provider: Provider<Redis> = {
      provide: options.connectionName,
      useFactory: async (...args: unknown[]): Promise<Redis> => {
        const connectionOptions = await options.useFactory(...args);
        const client = new Redis({ ...connectionOptions });

        const { host, port } = connectionOptions;
        client.on('connect', () => {
          console.log(`Connected to Redis: ${host}:${port}`);
        });
        client.on('error', (error) => {
          console.error(`Error connecting to Redis: ${host}:${port}`, error);
        });
        return client;
      },

      inject: options.inject ?? [],
    };

    return {
      module: RedisModule,
      providers: [provider],
      exports: [provider],
      imports: options.imports ?? [],
      global: true,
    };
  }
}

@Module({})
/**
 * Register a global provider for the Redis cluster client.
 */
export class RedisClusterModule {
  static forRootAsync(options: RedisClusterModuleAsyncOptions): DynamicModule {
    const clientProvider: Provider<Cluster> = {
      provide: options.connectionName,
      useFactory: async (...args: unknown[]): Promise<Cluster> => {
        const { clusterNodes, clusterOptions } = await options.useFactory(...args);
        const client = new Cluster(clusterNodes, clusterOptions);
        client.on('connect', () => {
          console.log(`Connected to Redis Cluster: `, clusterNodes);
        });
        return client;
      },

      inject: options.inject ?? [],
    };

    return {
      module: RedisClusterModule,
      providers: [clientProvider],
      exports: [clientProvider],
      imports: options.imports ?? [],
      global: true,
    };
  }
}
