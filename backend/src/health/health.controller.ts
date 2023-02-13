import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller({
  path: 'health',
  version: '',
})
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      info: { backend: { status: 'up' } },
      error: {},
      details: { backend: { status: 'up' } },
    };
  }
}
