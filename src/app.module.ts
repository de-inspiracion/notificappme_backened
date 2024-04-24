import { ConfigurationModule } from './shared/config/config.module';
import { AuthModule } from './auth/auth.module';
import { FirestoreModule } from './services/firestore/firestore.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { LogEventsListener } from './events/listeners/log.listener';
import { LoggerClientServicesTrx } from './shared/logger/logger.client';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LogsEndpointModule } from './modules/logs-endpoint/logs-endpoint.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityModule } from './modules/activity/activity.module';
import { AuthFirebaseTokenMiddleware } from './middlewares/authFirebaseToken.middleware';
import { FirebaseAuthModule } from './services/firebaseAuth/firebaseAuth.module';
import { SchemasModule } from './db/mongoDB/mongoose.module';

@Module({
  imports: [
    ConfigurationModule,
    EventEmitterModule.forRoot(),
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>('KEY_FILENAME'),
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot(configService.get<string>('MONGODB_URI')),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        retryAttempts: 3,
        retryDelay: 1000,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    // LogsEndpointModule,
    FirebaseAuthModule,
    SchemasModule,
    ActivityModule,
  ],
  providers: [LoggerClientServicesTrx, LogEventsListener],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('activity');
    consumer.apply(AuthFirebaseTokenMiddleware).forRoutes('auth');
  }
}
