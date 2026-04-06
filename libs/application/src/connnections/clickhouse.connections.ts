import { ClickhouseModule } from '@app/framework/clickhouse/clickhouse.module';
import { Secret, SECRET_TOKEN } from '../config';

export const CLICKHOUSE_TOKENS = {
  PRIMARY: Symbol('PRIMARY'),
};

export const ClickhouseConnection = () =>
  ClickhouseModule.forRootAsync({
    provide: CLICKHOUSE_TOKENS.PRIMARY,
    useFactory: (secret: Secret) => ({ url: secret.CLICKHOUSE_URL }),
    inject: [SECRET_TOKEN],
  });
