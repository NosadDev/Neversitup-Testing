import { Exclude } from 'class-transformer';

export class ResponseUserDTO {
  _id: string;
  username: string;
  @Exclude()
  password: string;
  firstname: string;
  lastname: string;
}
