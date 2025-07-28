/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from './interfaces/auth.interface';
import { ErrorResponse } from '../types/commons';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Login')
  async login(data: LoginRequest): Promise<LoginResponse | ErrorResponse> {
    try {
      return await this.authService.login(data);
    } catch (error) {
      return { error: error.message };
    }
  }

  @GrpcMethod('AuthService', 'Register')
  async register(
    data: RegisterRequest,
  ): Promise<RegisterResponse | ErrorResponse> {
    try {
      return await this.authService.register(data);
    } catch (error) {
      return { error: error.message };
    }
  }

  @GrpcMethod('AuthService', 'ValidateToken')
  async validateToken(
    data: ValidateTokenRequest,
  ): Promise<ValidateTokenResponse | ErrorResponse> {
    return await this.authService.validateToken(data);
  }

  @GrpcMethod('AuthService', 'RefreshToken')
  async refreshToken(
    data: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse | ErrorResponse> {
    try {
      return await this.authService.refreshToken(data);
    } catch (error) {
      return { error: error.message };
    }
  }

  @GrpcMethod('AuthService', 'Logout')
  async logout(data: { token: string }): Promise<{ message: string }> {
    return await this.authService.logout(data.token);
  }
}
