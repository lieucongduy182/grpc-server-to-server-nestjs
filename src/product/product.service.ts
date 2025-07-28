import { Injectable } from '@nestjs/common';
import {
  CreateProductRequest,
  CreateProductResponse,
  Product,
  SearchProductsRequest,
  SearchProductsResponse,
  UpdateProductResponse,
} from './interfaces/product.interface';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      description: 'Latest iPhone with Pro camera system',
      price: 999.99,
      stock: 50,
      category: 'Electronics',
      image_url: 'https://example.com/iphone14.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'MacBook Pro M2',
      description: 'Powerful laptop with M2 chip',
      price: 1299.99,
      stock: 30,
      category: 'Electronics',
      image_url: 'https://example.com/macbook.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  getProduct(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  createProduct(
    createProductRequest: CreateProductRequest,
  ): CreateProductResponse {
    const newProduct: Product = {
      id: this.products.length++,
      ...createProductRequest,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.products.push(newProduct);
    return {
      ...newProduct,
      message: 'Product created successfully',
    };
  }

  updateProduct(
    updateProductRequest: UpdateProductResponse,
  ): UpdateProductResponse | undefined {
    const index = this.products.findIndex(
      (p) => (p.id = updateProductRequest.id),
    );
    if (index === -1) return undefined;
    const updatedProduct = {
      ...this.products[index],
      ...updateProductRequest,
      updated_at: new Date().toISOString(),
    };

    this.products[index] = updatedProduct;

    return {
      ...updatedProduct,
      message: 'Product updated successfully',
    };
  }

  deleteProduct(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1);
    return true;
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  searchProducts(searchRequest: SearchProductsRequest): SearchProductsResponse {
    let filteredProducts = this.products;

    if (searchRequest.query) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchRequest.query.toLowerCase()) ||
          p.description
            .toLowerCase()
            .includes(searchRequest.query.toLowerCase()),
      );
    }

    if (searchRequest.category) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.category.toLowerCase() === searchRequest.category.toLowerCase(),
      );
    }

    // Filter by price range
    if (searchRequest.min_price > 0) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price >= searchRequest.min_price,
      );
    }

    if (searchRequest.max_price > 0) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price <= searchRequest.max_price,
      );
    }

    const page = Math.max(1, searchRequest.page || 1);
    const limit = Math.max(1, searchRequest.limit || 10);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      limit,
    };
  }
}
