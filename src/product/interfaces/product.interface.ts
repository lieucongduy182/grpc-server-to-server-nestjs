export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
}

export interface CreateProductResponse extends Product {
  message: string;
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: number;
}

export interface UpdateProductResponse extends Product {
  message: string;
}

export interface SearchProductsRequest {
  query: string;
  category: string;
  min_price: number;
  max_price: number;
  page: number;
  limit: number;
}

export interface SearchProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}
