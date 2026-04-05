import { z } from 'zod';

export const SECRET_TOKEN = Symbol('SECRET_TOKEN');

export const SecretSchema = z.object({
  CUTOFF_DATE: z.coerce.date(),
});

export type Secret = z.infer<typeof SecretSchema>;
