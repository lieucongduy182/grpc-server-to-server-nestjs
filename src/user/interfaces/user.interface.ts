export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface GetUserRequest {
  id: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface CreateUserResponse {
  id: number;
  name: string;
  email: string;
  message: string;
  phone?: string;
  address?: string;
}

export interface GetAllUsersResponse {
  users: User[];
}
