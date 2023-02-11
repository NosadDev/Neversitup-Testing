import {
  BadRequestException,
  Controller,
  Inject,
  Post,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { Order, OrderDocument } from 'src/common/database/schemas/order.schema';
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
