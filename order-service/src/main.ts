import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: process.env.SERVICE_HOST ?? 'localhost',
      port: Number(process.env.SERVICE_TCP_PORT ?? '8000'),
    },
  });
  await app.startAllMicroservices();
  await app.listen(Number(process.env.SERVICE_HTTP_PORT ?? '3000'));
}
bootstrap();
