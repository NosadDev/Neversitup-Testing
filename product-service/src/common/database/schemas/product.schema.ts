import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Transform } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ versionKey: false })
export class Product {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
