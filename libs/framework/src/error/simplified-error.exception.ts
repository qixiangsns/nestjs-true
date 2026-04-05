/**
 * Error class that is simplified to only include the message and the name of the error.
 */
export class SimplifiedError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
    this.stack = undefined;
  }
}
