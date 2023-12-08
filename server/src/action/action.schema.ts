import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type ActionDocument = Action & Document;

@Schema()
export class Action {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: string;
  @Prop({ required: true })
  text: string;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
