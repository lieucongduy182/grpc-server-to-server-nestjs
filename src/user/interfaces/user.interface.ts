export interface User {
  id: number;
  name: string;
  email: string;
}

export interface GetUserRequest {
  id: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface CreateUserResponse {
  id: number;
  name: string;
  email: string;
  message: string;
}

export interface GetAllUsersResponse {
  users: User[];
}
