import { SecretProvider } from '../interface/provider.interface';
import { Logger } from '@nestjs/common';

export class EnvSecretProvider implements SecretProvider {
  private logger = new Logger('EnvSecretProvider');
  constructor() {}
  get() {
    return process.env;
  }
}
