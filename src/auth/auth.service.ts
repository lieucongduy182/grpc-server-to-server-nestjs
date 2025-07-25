/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
    },
  ];
  private blacklistedTokens = new Set<string>();

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user = this.users.find((u) => u.email === loginRequest.email);

    if (!user || user.password !== loginRequest.password) {
      throw new Error('Invalid credentials');
    }

    // mock token generation
    const accessToken = `access_token_${user.id}_${Date.now()}`;
    const refreshToken = `refresh_token_${user.id}_${Date.now()}`;

    const { password: _, ...userWithoutPassword } = user;

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: userWithoutPassword,
      message: 'Login successful',
    };
  }

  async register(registerRequest: RegisterRequest): Promise<RegisterResponse> {
    const existingUser = this.users.find(
      (u) => u.email === registerRequest.email,
    );

    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: this.users.length + 1,
      ...registerRequest,
    };

    this.users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      ...userWithoutPassword,
      message: 'User registered successfully',
    };
  }

  async validateToken(
    validateTokenRequest: ValidateTokenRequest,
  ): Promise<ValidateTokenResponse> {
    if (this.blacklistedTokens.has(validateTokenRequest.token)) {
      return {
        valid: false,
        user: null,
        message: 'Token is blacklisted',
      };
    }

    const tokenParts = validateTokenRequest.token.split('_');
    if (tokenParts.length < 3) {
      return {
        valid: false,
        user: null,
        message: 'Invalid token format',
      };
    }

    const userId = parseInt(tokenParts[2]);
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      return {
        valid: false,
        user: null,
        message: 'User not found',
      };
    }

    const { password: _, ...userWithoutPassword } = user;

    return {
      valid: true,
      user: userWithoutPassword,
      message: 'Token is valid',
    };
  }

  async refreshToken(
    refreshTokenRequest: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    const tokenParts = refreshTokenRequest.refresh_token.split('_');
    if (tokenParts.length < 3) {
      throw new Error('Invalid refresh token format');
    }
    const userId = parseInt(tokenParts[2]);
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    // mock token generation
    const accessToken = `access_token_${user.id}_${Date.now()}`;
    const refreshToken = `refresh_token_${user.id}_${Date.now()}`;

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      message: 'Tokens refreshed successfully',
    };
  }

  async logout(token: string): Promise<{ message: string }> {
    this.blacklistedTokens.add(token);
    return { message: 'User logged out successfully' };
  }
}
