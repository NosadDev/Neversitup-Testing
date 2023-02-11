import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Get all product' })
  @Get('products')
  async getProducts() {
    return this.productService.getProducts();
  }

  @ApiOperation({ summary: 'Get product by id' })
  @Get('product/:id')
  async findProduct(@Param('id') id: string) {
    return this.productService.findById(id);
  }
}
