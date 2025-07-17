import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetAllUsersResponse,
  GetUserRequest,
  User,
} from './interfaces/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'GetUser')
  getUser(data: GetUserRequest): User | { error: string } {
    const user = this.userService.getUser(data.id);
    if (!user) {
      return { error: 'User not found' };
    }
    return user;
  }

  @GrpcMethod('UserService', 'CreateUser')
  createUser(data: CreateUserRequest): CreateUserResponse {
    return this.userService.createUser(data);
  }

  @GrpcMethod('UserService', 'GetAllUsers')
  getAllUsers(): GetAllUsersResponse {
    const users = this.userService.getAllUsers();
    return {
      users,
    };
  }
}
