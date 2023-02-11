import {
  Injectable,
  ConflictException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/common/database/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  findByUsername(username: string) {
    return this.userModel.findOne({ username }).catch((e) => {
      return new ServiceUnavailableException(e.message);
    });
  }

  async register(data: Record<string, any>) {
    const exists = await this.findByUsername(data.username);
    if (exists) {
      return new ConflictException('username already exists');
    } else {
      const user = new this.userModel(data);
      return user
        .save()
        .then()
        .catch((e) => {
          return new ServiceUnavailableException(e.message);
        });
    }
  }
}
