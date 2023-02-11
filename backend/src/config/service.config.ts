import { registerAs } from '@nestjs/config';
import { ClientProvider, Transport } from '@nestjs/microservices';

const userServiceConfig = registerAs(
  'user.service.config',
  (): ClientProvider => ({
    transport: Transport.TCP,
    options: {
      host: process.env.USER_SERVICE_HOST,
      port: Number(process.env.USER_SERVICE_TCP_PORT),
    },
  }),
);

const productServiceConfig = registerAs(
  'product.service.config',
  (): ClientProvider => ({
    transport: Transport.TCP,
    options: {
      host: process.env.PRODUCT_SERVICE_HOST,
      port: Number(process.env.PRODUCT_SERVICE_TCP_PORT),
    },
  }),
);

const orderServiceConfig = registerAs(
  'order.service.config',
  (): ClientProvider => ({
    transport: Transport.TCP,
    options: {
      host: process.env.ORDER_SERVICE_HOST,
      port: Number(process.env.ORDER_SERVICE_TCP_PORT),
    },
  }),
);

export { userServiceConfig, productServiceConfig, orderServiceConfig };
