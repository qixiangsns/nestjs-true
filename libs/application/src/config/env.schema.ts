import { z } from 'zod';

export const ENV_TOKEN = Symbol('ENV_TOKEN');
export const EnvSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production']),
  VAULT_TOKEN: z.string(),
  VAULT_URL: z.string(),
  VAULT_PATH: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;
