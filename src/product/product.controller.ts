import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Product } from './interfaces/product.interface';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'GetProduct')
  getProduct(data: { id: number }): Product | undefined {
    return this.productService.getProduct(data.id);
  }
}
