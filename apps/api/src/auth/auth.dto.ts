import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const LoginRequestSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

export class LoginRequestDto extends createZodDto(LoginRequestSchema) {}

const LoginResponseSchema = z.object({
  token: z.string().meta({ description: 'JWT token' }),
});

export class LoginResponseDto extends createZodDto(LoginResponseSchema) {}

const ErrorResponseSchema = z.object({
  message: z.string(),
  statusCode: z.number().meta({ description: 'HTTP status code' }),
  errors: z
    .object({
      username: z.string().optional(),
      password: z.string().optional(),
    })
    .optional()
    .meta({ description: 'Validation errors' }),
});

export class ErrorResponseDto extends createZodDto(ErrorResponseSchema) {}
