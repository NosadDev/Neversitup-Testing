import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'bson';
export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true, versionKey: false })
export class Order {
  @Prop(
    raw({
      _id: ObjectId,
      username: String,
    }),
  )
  auth: Record<string, any>;

  @Prop()
  products: Array<{ _id: ObjectId; qty: number }>;

  @Prop()
  summary: number;

  @Prop({ default: false })
  isCancel: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
