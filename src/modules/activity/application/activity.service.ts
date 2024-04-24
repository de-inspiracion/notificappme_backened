import { Inject, Injectable, Logger } from '@nestjs/common';
import { ActivityDataBaseI } from '../domain/database.interface';
import { activityI, stateI } from '../domain/activity.interface';
import { randomBytes } from 'crypto';
import random from 'random-string-generator';
@Injectable()
export class ActivityService {
  private readonly NAME = 'activity';
  private logger: Logger = new Logger(ActivityService.name);

  constructor(
    @Inject('activityServices') private services: ActivityDataBaseI,
  ) {}

  async getActivities(id, user) {
    const response = await this.services.getActivity(id, user);
    return response;
  }

  async addActivities(data: activityI, user: string) {
    const dateTimeInit = `${data.initDate}T${data.initTime}`;
    const dateTimeFinal = `${data.finalDate}T${data.finalTime}`;
    data.initDate = dateTimeInit;
    data.finalDate = dateTimeFinal;
    data.user = user || 'nouser';
    const pref = random(2);
    const code = random(4);
    data.randomid = `${pref}-${code}`;
    const response = await this.services.postActivity(data);
    return response;
  }

  async changeState(state: stateI, serviceActivity: string) {
    const response = await this.services.changeState(
      state.state,
      serviceActivity,
    );
    return response;
  }

  async deleteActivity(activity: string) {
    const response = await this.services.deteleActiviry(activity);
    return response;
  }
}
