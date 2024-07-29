import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { apiConfig, databaseConfig } from './app.config';

import { TimeoutMiddleware } from 'src/middlewares/timeout.middleware';
import { NetworkMiddleware } from 'src/middlewares/network.middleware';
import { HeadersMiddleware } from 'src/middlewares/headers.middleware';


@Module({
  imports: [
     ConfigModule.forRoot({
      ignoreEnvFile: false,
      ignoreEnvVars: false,
      envFilePath: 'config.env',
      load: [apiConfig, databaseConfig],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      TimeoutMiddleware,
      NetworkMiddleware,
      HeadersMiddleware
    ).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    });
  }

}
