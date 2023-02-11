import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RequestAuthLoginDTO } from 'src/common/dto/request/auth/login.dto';
import { RequestAuthRegisterDTO } from 'src/common/dto/request/auth/register.dto';
import { ServiceErrorInterceptor } from 'src/common/interceptors/service-error.interceptor';
import { LocalAuthGuard } from '../common/guard/local-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(new ServiceErrorInterceptor())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: RequestAuthLoginDTO })
  async login(@Auth() auth) {
    return this.authService.login(auth);
  }

  @ApiOperation({ summary: 'Register' })
  @Post('register')
  async register(@Body() body: RequestAuthRegisterDTO) {
    return this.authService.register(body);
  }
}
