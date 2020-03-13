import { Controller, Get, UseGuards, Body, Request, Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Document } from 'mongoose';

import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { UserService } from './user.service';

//import { IUserProfile } from '../../../gigit-shared/interfaces/user-profile.interface';
import { IUser } from '../common/interfaces';


@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}
  
  @UseGuards(new OptionalJwtAuthGuard())
  @Get()
  async findAll(): Promise<(IUser & Document)[]> {
    return await this.userService.findAll();
  }

  @UseGuards(new OptionalJwtAuthGuard())
  @Get(':handle')
  async findByHandle(@Param('handle') handle: string): Promise<IUser & Document> {
    return await this.userService.findByHandle(handle);    
  }

  @Get('unique/:handle')
  async uniqueHandle(@Param('handle') handle: string): Promise<any> {
    const user = await this.userService.findByHandle(handle); 
    return {
      value: user ? false : true
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('current')
  async update(@Request() req: any, @Body() user: IUser) : Promise<IUser & Document> {
    const currentUser: IUser = req.user;
    user.id = currentUser.id;
    return await this.userService.update(user);
  }
}
