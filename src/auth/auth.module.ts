import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

import { UserModule } from '../user';


const jwtOptions: JwtModuleOptions = {
  secret: 'secret', //from configuration
  signOptions: { expiresIn: '14d' } //from configuration
}

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register(jwtOptions),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
