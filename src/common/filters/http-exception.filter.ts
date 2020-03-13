
import { ExceptionFilter, HttpException, ArgumentsHost, HttpStatus, Catch, Inject } from '@nestjs/common';
import { FilterUtil } from './util.filter';
import { PollingException } from '../exceptions/polling.exception';

import { LoggerService } from '@nestjs/common';
import { gigitLogger } from '../logging/polling.logger';

@Catch(HttpException, PollingException)
export class HttpExceptionFilter implements ExceptionFilter {

  //consturctor (private readonly loggerService: LoggerService){}

  // ------------
  catch(ex: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = ex.getStatus ? ex.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let gigitErrorCode: string = null;
    if (ex instanceof PollingException) {
      gigitErrorCode = (ex as PollingException).gigitErrorCode;
    }

    const message =
      status !== HttpStatus.INTERNAL_SERVER_ERROR ? 
      (ex.message.error || ex.message || null) : 'Internal server error';

    const errResponse = FilterUtil.getErrorObject(
      status,
      request.path,
      request.method,
      message,
      gigitErrorCode
    );

    gigitLogger.error(errResponse);

    return response.status(status).json(errResponse);
  }

}