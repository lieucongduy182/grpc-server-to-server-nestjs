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
      phone: '123-456-7890',
      address: '123 Main St, Anytown, USA',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
      address: '456 Elm St, Othertown, USA',
      created_at: new Date(),
      updated_at: new Date(),
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
      phone: createUserRequest.phone,
      address: createUserRequest.address,
      created_at: new Date(),
      updated_at: new Date(),
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
