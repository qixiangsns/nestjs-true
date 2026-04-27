import { Body, Controller, HttpStatus, Logger, Post } from '@nestjs/common';
import { ErrorResponseDto, LoginRequestDto, LoginResponseDto } from './auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor() {}

  @Post('login')
  @ApiOperation({ summary: 'Login', description: 'Login to the system' })
  @ZodResponse({ type: LoginResponseDto, status: HttpStatus.OK, description: 'Login successful' })
  @ApiResponse({
    type: ErrorResponseDto,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid username or password',
  })
  login(@Body() body: LoginRequestDto) {
    console.log(body);
    return {
      token: '1234567890',
    };
  }
}
