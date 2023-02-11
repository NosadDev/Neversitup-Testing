import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RequestCancelOrderDTO } from 'src/common/dto/request/order/cancel.dto';
import { RequestCreateOrderDTO } from 'src/common/dto/request/order/create.dto';
import { AuthUser } from 'src/common/interfaces/auth-user.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE')
    private readonly orderClient: ClientProxy,
  ) {}

  getOrderById(id: string, auth: AuthUser) {
    return this.orderClient.send('order.find', { _id: id, auth });
  }

  orderHistory(auth: AuthUser) {
    return this.orderClient.send('order.history', { auth });
  }

  createOrder(auth: AuthUser, data: RequestCreateOrderDTO) {
    return this.orderClient.send('order.create', {
      auth,
      products: data.products,
    });
  }

  cancelOrder(auth: AuthUser, data: RequestCancelOrderDTO) {
    return this.orderClient.send('order.cancel', { auth, _id: data._id });
  }
}
