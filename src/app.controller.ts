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
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from './auth/interfaces/auth.interface';
import {
  CreateProductRequest,
  SearchProductsRequest,
  UpdateProductRequest,
} from './product/interfaces/product.interface';

interface UserService {
  getAllUsers(data: object): Observable<GetAllUsersResponse>;
  getUser(data: GetUserRequest): Observable<User>;
  createUser(data: CreateUserRequest): Observable<CreateUserResponse>;
}

interface AuthService {
  login(data: LoginRequest): Observable<LoginResponse>;
  register(data: RegisterRequest): Observable<RegisterResponse>;
  validateToken(data: ValidateTokenRequest): Observable<ValidateTokenResponse>;
  refreshToken(data: RefreshTokenRequest): Observable<RefreshTokenResponse>;
  logout(data: { token: string }): Observable<{ message: string }>;
}

interface ProductService {
  getProduct(data: { id: number }): Observable<any>;
  createProduct(data: CreateProductRequest): Observable<any>;
  updateProduct(data: UpdateProductRequest): Observable<any>;
  deleteProduct(data: { id: number }): Observable<any>;
  getAllProducts(data: object): Observable<any>;
  searchProducts(data: SearchProductsRequest): Observable<any>;
}

@Controller()
export class AppController implements OnModuleInit {
  private userService: UserService;
  private authService: AuthService;
  private productService: ProductService;

  constructor(@Inject('SERVICE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
    this.authService = this.client.getService<AuthService>('AuthService');
    this.productService =
      this.client.getService<ProductService>('ProductService');
  }

  // User endpoints
  @Get('users')
  getAllUsers(): Observable<GetAllUsersResponse> {
    return this.userService.getAllUsers({});
  }

  @Get('user/:id')
  getUser(@Param('id') id: string): Observable<User> {
    return this.userService.getUser({ id: parseInt(id) });
  }

  @Post('users')
  createUser(
    @Body() createUserRequest: CreateUserRequest,
  ): Observable<CreateUserResponse> {
    return this.userService.createUser(createUserRequest);
  }

  // Auth endpoints
  @Post('auth/login')
  login(@Body() loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.authService.login(loginRequest);
  }

  @Post('auth/register')
  register(
    @Body() registerRequest: RegisterRequest,
  ): Observable<RegisterResponse> {
    return this.authService.register(registerRequest);
  }

  @Post('auth/logout')
  logout(@Body() data: { token: string }): Observable<any> {
    return this.authService.logout(data);
  }

  @Post('auth/validate-token')
  validateToken(
    @Body() data: ValidateTokenRequest,
  ): Observable<ValidateTokenResponse> {
    return this.authService.validateToken(data);
  }

  @Get('product/:id')
  getProduct(@Param('id') id: string): Observable<any> {
    return this.productService.getProduct({ id: parseInt(id) });
  }
}
