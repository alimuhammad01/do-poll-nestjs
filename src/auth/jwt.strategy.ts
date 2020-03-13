import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpStatus } from '@nestjs/common';

import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { AuthService } from './auth.service';
import { PollingException, PollingErrors } from '../common/exceptions';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret' //from configuration
    });
  }

  // ---------------
  async validate(payload: any, done: VerifiedCallback) {

    const user = await this.authService.validate(payload);
    if (!user) {
      throw new PollingException(PollingErrors.AUTH.UNAUTHORIZED, 'Unauthorized access', HttpStatus.UNAUTHORIZED)
    }

    return done(null, user, payload.iat);
  }
}