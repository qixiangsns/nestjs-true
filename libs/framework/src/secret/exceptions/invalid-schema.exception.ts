import { ZodError } from 'zod';

export class InvalidSchemaException extends Error {
  constructor(zodError: ZodError) {
    const errorMessage = zodError.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ');
    super(`Invalid schema for secret: ${errorMessage}`);
    this.name = 'InvalidSchemaException';
    this.stack = undefined;
  }
}
