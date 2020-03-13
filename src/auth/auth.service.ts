
import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Document } from 'mongoose';
import * as bcryptjs from 'bcryptjs';

import { UserService } from '../user';

import { IUser, IUserToken, IUserRegistration } from '../common/interfaces'; 
import { PollingException, PollingErrors } from '../common/exceptions';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  )
  {}

  // ------------
  async login(emailOrHandle: string, password: string): Promise<IUserToken>{
    
    let user = await this.userService.findByEmailOrHandle(emailOrHandle);
    if (!user) {
      throw new PollingException(PollingErrors.AUTH.INVALID_CREDENTIALS, 'Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcryptjs.compare(password, user.password)) {
      return this.getUserToken(user);
    }
    
    throw new PollingException(PollingErrors.AUTH.INVALID_CREDENTIALS, 'Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  // -------------
  async register(registrationInfo: IUserRegistration) : Promise<IUserToken> {

    // these two calls should be handled within a single transaction
    let user = await this.userService.register(registrationInfo);

    //await this.userProfileService.createBasicProfile(user);
    return this.getUserToken(user);
  }

  // ------------
  protected getUserToken(user: IUser & Document) : IUserToken {
  
      const payload = {
        id: user.id,
        email: user.email
      }
  
      const token = this.jwtService.sign(payload);
      return { token: token, user: user };
  }

  // ------------
  async validate(payload: any): Promise<IUser> {
    let user = await this.userService.findById(payload.id);
    if (!user) {
      throw new PollingException(PollingErrors.AUTH.INVALID_CREDENTIALS, 'Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;

  }

}