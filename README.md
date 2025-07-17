# gRPC NestJS Demo - Server to Server Communication

This is a comprehensive guide for creating a basic gRPC demo with NestJS for server-to-server communication.

## Architecture

- **gRPC Server**: Runs on port 50051, handles business logic
- **HTTP Server**: Runs on port 3000, acts as a client calling the gRPC server

## Demo Features

- Get all users
- Get user by ID
- Create new user

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TypeScript

## Installation

```bash
npm install @nestjs/microservices @grpc/grpc-js @grpc/proto-loader
npm install --save-dev @types/node typescript ts-node ts-node-dev
```

## Project Structure

```
project/
├── proto/
│   └── user.proto
├── src/
│   ├── user/
│   │   ├── interfaces/
│   │   │   └── user.interface.ts
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.module.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── main.ts
│   └── grpc-server.ts
├── package.json
└── tsconfig.json
```

## Quick Start

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd grpc-nestjs-demo
npm install
```

### 2. Start gRPC Server

```bash
npm run start:grpc
```

The gRPC server will start on `localhost:50051`

### 3. Start HTTP Server (in a new terminal)

```bash
npm run start:dev
```

The HTTP server will start on `http://localhost:3000`

## API Endpoints

### Get All Users
```bash
curl http://localhost:3000/users
```

### Get User by ID
```bash
curl http://localhost:3000/users/1
```

### Create New User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Johnson","email":"alice@example.com"}'
```

## Protocol Buffer Definition

The demo uses a simple user service defined in `proto/user.proto`:

```proto
syntax = "proto3";

package user;

service UserService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
  rpc CreateUser(CreateUserRequest) returns (CreateUserResponse);
  rpc GetAllUsers(Empty) returns (GetAllUsersResponse);
}
```

## Key Components

### gRPC Server
- **UserService**: Business logic for user operations
- **UserController**: gRPC method handlers using `@GrpcMethod` decorator
- **UserModule**: Module configuration for the gRPC microservice

### HTTP Server (Client)
- **AppController**: HTTP endpoints that call gRPC service
- **AppModule**: HTTP server configuration with gRPC client setup

## Benefits of gRPC

- **High Performance**: Binary protocol with efficient serialization
- **Type Safety**: Protocol Buffers provide strong typing
- **Streaming Support**: Bidirectional streaming capabilities
- **Cross-Platform**: Works across different languages and platforms
- **Compact**: Smaller payload size compared to JSON

## Troubleshooting

### Common Issues

1. **Port Already in Use**: Make sure ports 3000 and 50051 are available
2. **Proto File Not Found**: Verify the proto file path in gRPC configuration
3. **Module Not Found**: Ensure all dependencies are installed

### Error Solutions

```bash
# If you encounter module errors
npm install --save-dev @types/node typescript ts-node nodemon

# If proto file path issues occur
# Check the join(__dirname, '../proto/user.proto') path in both servers
```

## Extending the Demo

You can extend this demo by:

- Adding more services to the proto file
- Implementing database persistence
- Adding authentication and authorization
- Implementing streaming RPCs
- Adding error handling and logging
- Creating additional microservices

## Technologies Used

- **NestJS**: Node.js framework for building scalable server-side applications
- **gRPC**: High-performance RPC framework
- **Protocol Buffers**: Language-neutral serialization mechanism
- **TypeScript**: Typed superset of JavaScript

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For questions and support, please open an issue in the repository or contact the maintainers.