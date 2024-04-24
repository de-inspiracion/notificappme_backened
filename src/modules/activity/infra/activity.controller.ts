import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { ActivityService } from '../application/activity.service';
import { ApiTags } from '@nestjs/swagger';
import { activityI, stateI } from '../domain/activity.interface';

@Controller('activity')
@ApiTags('activity')
export class activityController {
  constructor(private readonly activityService: ActivityService) {}

  @Version('1')
  @Get(':id')
  async activity(
    @Param('id') id: string,
    @Headers('user') user: string,
  ): Promise<any> {
    try {
      return await this.activityService.getActivities(id, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Version('1')
  @Post('')
  async addActivity(
    @Body() data: activityI,
    @Headers('user') user: string,
  ): Promise<any> {
    try {
      return await this.activityService.addActivities(data, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Version('1')
  @Put(':id/state')
  async changeState(
    @Body() state: stateI,
    @Param('id') serviceActivity: string,
  ): Promise<any> {
    try {
      return await this.activityService.changeState(state, serviceActivity);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Version('1')
  @Delete(':id')
  async deleteActivity(@Param('id') activity: string): Promise<any> {
    try {
      return await this.activityService.deleteActivity(activity);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
