import { UserService } from './../user/user.service';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RequestAuthRegisterDTO } from 'src/common/dto/request/auth/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username).catch((e) => {
      if (e['code'] == 'ECONNREFUSED') {
        throw new ServiceUnavailableException('Unable to connect service');
      } else {
        throw e;
      }
    });
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      return { _id: user._id, username: user.username };
    }
    return null;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async register(data: RequestAuthRegisterDTO) {
    data.password = await bcrypt.hash(
      data.password,
      Number(process.env.BCRYPT_ROUND ?? 10),
    );
    return this.userService.register(data);
  }
}
