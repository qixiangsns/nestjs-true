import { Options } from 'pino-http';
import { PrettyOptions } from 'pino-pretty';
import { callerMixin } from './mixins/caller.mixin';
import { traceMixin } from './mixins/trace.mixin';

const PRETTY_OPTIONS = {
  levelFirst: true,
  ignore: 'pid,hostname,time,context',
} as const satisfies PrettyOptions;

const DEFAULT_OPTIONS = {
  base: null,
  genReqId: (req) => req.headers['x-request-id'] || '',
  autoLogging: false,
  quietReqLogger: true,
  quietResLogger: true,
} as const satisfies Options;

const PRODUCTION_OPTIONS = {
  depthLimit: 2,
  level: 'info',
  mixin: () => traceMixin(),
} as const satisfies Options;

const DEVELOPMENT_OPTIONS = {
  level: 'debug',
  depthLimit: 2,
  transport: {
    target: 'pino-pretty',
    options: PRETTY_OPTIONS,
  },
  mixin: () => callerMixin(new Error().stack || ''),
} as const satisfies Options;

export const getPinoOptions = (isProduction: boolean): Options => ({
  ...DEFAULT_OPTIONS,
  ...(isProduction ? PRODUCTION_OPTIONS : DEVELOPMENT_OPTIONS),
});
