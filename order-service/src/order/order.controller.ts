import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ObjectId } from 'bson';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderSerive: OrderService) {}

  @MessagePattern('order.find')
  async findOrder(data) {
    if (!ObjectId.isValid(data._id) || !ObjectId.isValid(data.auth._id)) {
      return new BadRequestException('Invalid Object ID');
    } else {
      data._id = new ObjectId(data._id);
      data.auth._id = new ObjectId(data.auth._id);
      return this.orderSerive.findOrder(data);
    }
  }

  @MessagePattern('order.history')
  async orderHistory(data) {
    if (!ObjectId.isValid(data.auth._id)) {
      return new BadRequestException('Invalid Object ID');
    } else {
      data.auth._id = new ObjectId(data.auth._id);
      return this.orderSerive.orderHistory(data);
    }
  }

  @MessagePattern('order.create')
  async createOrder(data) {
    if (
      !ObjectId.isValid(data.auth._id) ||
      !data.products.every((v: { _id: string }) => ObjectId.isValid(v._id))
    ) {
      return new BadRequestException('Invalid Object ID');
    } else {
      data.products = data.products.map((v) => ({
        ...v,
        _id: new ObjectId(v._id),
      }));
      return this.orderSerive.createOrder(data);
    }
  }

  @MessagePattern('order.cancel')
  async cancelOrder(data) {
    if (!ObjectId.isValid(data._id) || !ObjectId.isValid(data.auth._id)) {
      return new BadRequestException('Invalid Object ID');
    } else {
      data._id = new ObjectId(data._id);
      data.auth._id = new ObjectId(data.auth._id);
      return this.orderSerive.cancelOrder(data);
    }
  }
}
