import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RequestCancelOrderDTO } from 'src/common/dto/request/order/cancel.dto';
import { RequestCreateOrderDTO } from 'src/common/dto/request/order/create.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { AuthUser } from 'src/common/interfaces/auth-user.interface';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller()
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Get order info of user by id' })
  @Get('order/:id')
  async getOrderById(@Auth() auth: AuthUser, @Param('id') id: string) {
    return this.orderService.getOrderById(id, auth);
  }

  @ApiOperation({ summary: 'Get order history of user' })
  @Get('orders')
  async orderHistory(@Auth() auth: AuthUser) {
    return this.orderService.orderHistory(auth);
  }

  @ApiOperation({ summary: 'Create new order' })
  @Post('orders')
  async createOrder(
    @Auth() auth: AuthUser,
    @Body() body: RequestCreateOrderDTO,
  ) {
    return this.orderService.createOrder(auth, body);
  }

  @ApiOperation({ summary: 'Cancel order' })
  @Put('order')
  async cancelOrder(
    @Auth() auth: AuthUser,
    @Body() body: RequestCancelOrderDTO,
  ) {
    return this.orderService.cancelOrder(auth, body);
  }
}
