import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('findByUsername')
  findByUsername(username: string) {
    return this.userService.findByUsername(username);
  }

  @MessagePattern('register')
  register(data: Record<string, any>) {
    return this.userService.register(data);
  }
}
