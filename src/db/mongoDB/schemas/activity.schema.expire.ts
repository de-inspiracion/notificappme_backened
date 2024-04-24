import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class ActivityExpire extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  client: string;

  @Prop({ type: String, default: 'CREATED' })
  state: string;

  @Prop({ type: String })
  idclient: string;

  @Prop({ type: Date })
  initDate: string;

  @Prop({ type: Date })
  finalDate: string;

  @Prop({ type: String })
  initTime: string;

  @Prop({ type: String })
  finalTime: string;

  @Prop({ type: String })
  user: string;

  @Prop({ type: String, index: true })
  randomid: string;

  @Prop({ type: Date, default: Date.now, expires: '8h' })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ActivityExpireSchema =
  SchemaFactory.createForClass(ActivityExpire);
