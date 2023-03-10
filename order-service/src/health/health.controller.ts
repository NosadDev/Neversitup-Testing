import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () =>
        this.microservice.pingCheck('tcp', {
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: Number(process.env.SERVICE_TCP_PORT ?? '8000'),
          },
        }),
    ]);
  }
}
