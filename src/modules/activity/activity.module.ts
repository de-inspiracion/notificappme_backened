import { Module } from '@nestjs/common';
import { LoggerClientServicesTrx } from '../../shared/logger/logger.client';
import { MongoService } from './infra/mongoServices';
import { activityController } from './infra/activity.controller';
import { ActivityService } from './application/activity.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Activity,
  ActivitySchema,
} from 'src/db/mongoDB/schemas/activity.schema';
import {
  ActivityExpire,
  ActivityExpireSchema,
} from 'src/db/mongoDB/schemas/activity.schema.expire';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
      { name: ActivityExpire.name, schema: ActivityExpireSchema },
    ]),
  ],
  controllers: [activityController],
  providers: [
    ActivityService,
    LoggerClientServicesTrx,
    { provide: 'activityServices', useClass: MongoService },
  ],
  exports: [],
})
export class ActivityModule {}
