import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequestCancelOrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  _id: string;
}
