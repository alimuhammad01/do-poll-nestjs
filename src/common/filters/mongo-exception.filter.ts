
import { ExceptionFilter, HttpException, ArgumentsHost, HttpStatus, Catch } from '@nestjs/common';
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';
import { FilterUtil } from './util.filter';
import { PollingErrors }  from '../exceptions/polling.errors';
import { gigitLogger } from '../logging/polling.logger';

@Catch(Error, MongoError)
export class MongoExceptionFilter implements ExceptionFilter {

  // ------------
  catch(ex: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = HttpStatus.BAD_REQUEST;

    const errResponse = FilterUtil.getErrorObject(
        status,
        request.path,
        request.method,
        ex.message || 'Database error',
        PollingErrors.SYSTEM.DATABASE
      );

    gigitLogger.error(errResponse);

    return response.status(status).json(errResponse);
  }

}