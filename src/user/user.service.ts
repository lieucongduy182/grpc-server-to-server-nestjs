import { Injectable } from '@nestjs/common';
import {
  CreateUserRequest,
  CreateUserResponse,
  User,
} from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  ];

  getUser(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserRequest: CreateUserRequest): CreateUserResponse {
    const newUser: User = {
      id: this.users.length + 1,
      name: createUserRequest.name,
      email: createUserRequest.email,
    };

    this.users.push(newUser);

    return {
      ...newUser,
      message: 'User created successfully',
    };
  }

  getAllUsers(): User[] {
    return this.users;
  }
}
