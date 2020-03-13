import { WinstonModule, WinstonModuleOptions, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

const loggerOptions: WinstonModuleOptions = {
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
      debugStdout: true,
      //consoleWarnLevels: ['debug']
    }),
    // other transports...
  ],
  
}

export const gigitLogger = WinstonModule.createLogger(loggerOptions);
