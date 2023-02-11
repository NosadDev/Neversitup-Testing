import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { Order, OrderDocument } from 'src/common/database/schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productClient: ClientProxy,
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async findOrder(data) {
    return await this.orderModel
      .findOne(data)
      .then((r) =>
        r == null
          ? new NotFoundException(`Not found Order _id: ${data._id}`)
          : r,
      )
      .catch((e) => {
        return new ServiceUnavailableException(e.message);
      });
  }

  async orderHistory(data) {
    return await this.orderModel
      .aggregate()
      .match(data)
      .project({ summary: true, isCancel: true })
      .catch((e) => {
        return new ServiceUnavailableException(e.message);
      });
  }

  async createOrder(data) {
    const products = await Promise.all(
      data.products.map(async (v) => {
        return await lastValueFrom(
          this.productClient.send('product.id', v._id),
        );
      }),
    );

    if (products.some((v) => v == null)) {
      const indexNull = products.findIndex((v) => v == null);
      return new BadRequestException(
        `data.products.${indexNull}._id not exists`,
      );
    }
    data.products = data.products.map((v) => {
      const product = products.find((f) => f._id == v._id);
      return {
        ...v,
        ppu: product.price,
        summary: product.price * v.qty,
      };
    });
    data.summary = data.products.reduce((a, b) => a.summary + b.summary);
    return new this.orderModel(data)
      .save()
      .then((r) => r)
      .catch((e) => {
        return new ServiceUnavailableException(e.message);
      });
  }

  async cancelOrder(data) {
    const exists = await this.orderModel.findById(data._id);
    if (!exists) {
      return new NotFoundException(`Not found order _id: ${data._id}`);
    } else if (exists.isCancel == true) {
      return new ConflictException(`Order _id: ${data._id} already cancel`);
    }
  }
}
