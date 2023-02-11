import { Inject, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, tap } from 'rxjs';

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
