import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUserLogin, IUserToken, IUserRegistration } from '../common/interfaces';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  )
  {}

  // ------------
  @Post('register')
  async register(@Body() registrationInfo: IUserRegistration): Promise<IUserToken> {
    return await this.authService.register(registrationInfo)
  }

  // ------------
  @Post('login')
  async login(@Body() loginInfo: IUserLogin) : Promise<IUserToken> {
    const usrToken = await this.authService.login(loginInfo.emailOrHandle, loginInfo.password);
    return usrToken;
  }
}