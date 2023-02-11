import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ResponseUserDTO } from 'src/common/dto/response/user/user.dto';
import { RequestAuthRegisterDTO } from 'src/common/dto/request/auth/register.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private userClient: ClientProxy) {}

  async findByUsername(username: string): Promise<ResponseUserDTO> {
    return await lastValueFrom(
      this.userClient.send('findByUsername', username),
    );
  }

  async register(data: RequestAuthRegisterDTO) {
    return this.userClient.send('register', data);
  }
}
