import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ResponseUserDTO } from 'src/common/dto/response/user/user.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
// import { User } from 'src/common/schemas/user.schema';
import { Auth } from '../common/decorators/auth.decorator';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get profile' })
  @Get('/profile')
  async profile(@Auth() auth): Promise<ResponseUserDTO> {
    return this.userService.findByUsername(auth.username);
  }
}
