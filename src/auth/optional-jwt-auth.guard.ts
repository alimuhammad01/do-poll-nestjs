
import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {

  // ------------
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let result = true;
    if (request && request.headers && request.headers.authorization) {
      result = (await super.canActivate(context)) as boolean;
    }

    return result;
  }
}

