import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/logging/logger.middleware';

import * as nestWinston from 'nest-winston';
import * as winston from 'winston';

// ------------
const mongooseModuleOptions: MongooseModuleOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryAttempts: 0
};


@Module({
  imports: [
    //nestWinston.WinstonModule.forRoot(loggerOptions), //logging
    MongooseModule.forRoot('mongodb://localhost/local?retryWrites=false', mongooseModuleOptions), //from configuration
    ConfigModule.forRoot(),
    AuthModule
  ]
})
export class AppModule implements NestModule {
  
  // --------------
  // Use this middleware to log/debug requests
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}
