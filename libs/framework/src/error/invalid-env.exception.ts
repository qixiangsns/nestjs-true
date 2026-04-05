import { SimplifiedError } from './simplified-error.exception';

export class InvalidEnv extends SimplifiedError {
  constructor(message: string) {
    super(message);
  }
}
