import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './grpc-server.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'services',
        protoPath: join(__dirname, '../proto/services.proto'),
        url: 'localhost:50051',
      },
    },
  );

  await app.listen();
  console.log('gRPC multiple server is running on port 50051');
}

bootstrap();
