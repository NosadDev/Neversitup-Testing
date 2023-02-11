import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';
import { HealthModule } from './health/health.module';
import mongoConfig from './config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: mongoConfig,
    }),
    OrderModule,
    HealthModule,
  ],
})
export class AppModule {}
