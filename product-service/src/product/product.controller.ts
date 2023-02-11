import { BadRequestException, Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern } from '@nestjs/microservices';
import { ObjectId } from 'bson';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @MessagePattern('products')
  async getAll() {
    return await this.productService.getAll();
  }

  @MessagePattern('product.id')
  async findById(_id: string) {
    if (!ObjectId.isValid(_id)) {
      return new BadRequestException('Invalid Object ID');
    } else {
      return await this.productService.findById(_id);
    }
  }
}
