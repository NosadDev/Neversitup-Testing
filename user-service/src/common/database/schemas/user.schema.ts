import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
