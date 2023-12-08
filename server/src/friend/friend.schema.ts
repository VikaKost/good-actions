import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type FriendDocument = Friend & Document;

@Schema()
export class Friend {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: string;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  friend: string;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
