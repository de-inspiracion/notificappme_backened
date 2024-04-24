import { InjectModel } from '@nestjs/mongoose';
import { ActivityDataBaseI } from '../domain/database.interface';
import { Model } from 'mongoose';
import { Activity } from 'src/db/mongoDB/schemas/activity.schema';
import { stateI } from '../domain/activity.interface';
import { ActivityExpire } from 'src/db/mongoDB/schemas/activity.schema.expire';

export class MongoService implements ActivityDataBaseI {
  constructor(
    @InjectModel(Activity.name)
    private activities: Model<Activity>,
    @InjectModel(ActivityExpire.name)
    private activitiesExpire: Model<ActivityExpire>,
  ) {}
  postActivity(data) {
    if (data.user === 'nouser') {
      return this.activitiesExpire.create(data);
    }
    return this.activities.create(data);
  }

  getActivity(id, user) {
    return this.activities.find({ _id: id, user: user });
  }

  changeState(state: stateI, serviceActivity: string) {
    return this.activities.findByIdAndUpdate(serviceActivity, { state: state });
  }

  deteleActiviry(activity: string) {
    return this.activities.findByIdAndDelete(activity);
  }
}
