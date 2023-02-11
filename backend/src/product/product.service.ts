import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productClient: ClientProxy,
  ) {}

  async getProducts() {
    return this.productClient.send('products', {});
  }

  findById(id: string) {
    return this.productClient.send('product.id', id);
  }
}
