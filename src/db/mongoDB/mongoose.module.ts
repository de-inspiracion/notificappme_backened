import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './schemas/activity.schema';
import {
  ActivityExpire,
  ActivityExpireSchema,
} from './schemas/activity.schema.expire';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
      { name: ActivityExpire.name, schema: ActivityExpireSchema },
    ]),
  ],
  providers: [],
  exports: [],
})
export class SchemasModule {}
