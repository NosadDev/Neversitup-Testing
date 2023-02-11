import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/common/database/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}
  async getAll() {
    return await this.productModel
      .aggregate()
      .project({ name: true, price: true });
  }

  async findById(_id: string) {
    return await this.productModel.findById(_id).catch((e) => {
      return new ServiceUnavailableException(e.message);
    });
  }
}
