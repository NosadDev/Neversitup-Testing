import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class CreateOrderProduct {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  _id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  qty: number;
}

export class RequestCreateOrderDTO {
  @ApiProperty({ type: [CreateOrderProduct] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProduct)
  products: CreateOrderProduct[];
}
