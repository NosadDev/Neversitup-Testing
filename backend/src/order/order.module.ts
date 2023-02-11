import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientsModule } from '@nestjs/microservices';
import { orderServiceConfig } from 'src/config/service.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ORDER_SERVICE',
        useFactory: orderServiceConfig,
      },
    ]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
