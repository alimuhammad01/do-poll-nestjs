import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

import { gigitLogger } from './polling.logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  //---------
  use(req: Request, res: Response, next: Function) {
    try {
      gigitLogger.verbose(this.requestToString(req));
    }
    catch (err) {
      console.log(`Error in LoggerMiddleware: ${err}`);
    }
    next();
  }

  //----------
  requestToString(req: Request) : string {
    return `Client: ${req.connection?.remoteAddress} ${req.method}: ${req.url}`;
    //return `Client: ${req.method}: ${req.url}`
  }
}