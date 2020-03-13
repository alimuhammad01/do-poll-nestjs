import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { HttpExceptionFilter } from './common/filters';
import { MongoExceptionFilter } from './common/filters';

import { gigitLogger } from './common/logging';


async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: gigitLogger });
  app.useLogger(gigitLogger);
  app.useGlobalFilters(new HttpExceptionFilter(), new MongoExceptionFilter());
  app.enableCors();
  
  await app.listen(3001);
}
bootstrap();
