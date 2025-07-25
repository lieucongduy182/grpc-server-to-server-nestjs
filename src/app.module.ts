import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'services',
          protoPath: join(__dirname, '../proto/services.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
