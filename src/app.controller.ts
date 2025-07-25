import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetAllUsersResponse,
  GetUserRequest,
  User,
} from './user/interfaces/user.interface';

interface UserService {
  getAllUsers(data: object): Observable<GetAllUsersResponse>;
  getUser(data: GetUserRequest): Observable<User>;
  createUser(data: CreateUserRequest): Observable<CreateUserResponse>;
}

@Controller('users')
export class AppController implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject('SERVICE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Get()
  getAllUsers(): Observable<GetAllUsersResponse> {
    return this.userService.getAllUsers({});
  }

  @Get(':id')
  getUser(@Param('id') id: string): Observable<User> {
    return this.userService.getUser({ id: parseInt(id) });
  }

  @Post()
  createUser(
    @Body() createUserRequest: CreateUserRequest,
  ): Observable<CreateUserResponse> {
    return this.userService.createUser(createUserRequest);
  }
}
