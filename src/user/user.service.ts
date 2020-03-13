import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Document } from 'mongoose';


import { IUser } from '../common/interfaces/user.interface';
//import { IUserProfile } from '../common/interfaces/user-profile.interface';
import { IUserRegistration } from '../common/interfaces/user-registration.interface';
import { PollingException } from '../common/exceptions/polling.exception';
import { PollingErrors } from '../common/exceptions/polling.errors';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser & Document>,
    //@InjectModel('UserProfile') private readonly userProfileModel: Model<IUserProfile & Document>
  )
  {}

  // --------------
  async register(u : IUserRegistration) : Promise<IUser & Document> {

    let user = await this.findByEmail(u.email);
    if (user) {      
      throw new PollingException(PollingErrors.REGISTRATION.USER_EMAIL_ALREADY_EXISTS, 'Email already exists', HttpStatus.BAD_REQUEST);
    }

    user = await this.findByHandle(u.handle);
    if (user) {      
      throw new PollingException(PollingErrors.REGISTRATION.USER_HANDLE_ALREADY_EXISTS, 'Handle already exists', HttpStatus.BAD_REQUEST);
    }

    let newUser = new this.userModel(u);
    return await newUser.save();

    // In order to use transactions, the MongoDB needs a replica set.
    // let userSession = await this.userModel.db.startSession();
    // userSession.startTransaction();

    // try {
    //   let user = await this.findByEmail(u.email);
    //   if (user) {      
    //     throw new PollingException(PollingErrors.REGISTRATION.USER_EMAIL_ALREADY_EXISTS, 'User already exists', HttpStatus.BAD_REQUEST);
    //   }

    //   let newUser = new this.userModel(u);
    //   await newUser.save({session: userSession});

    //   let newUserProfile = new this.userProfileModel();
    //   newUserProfile.user = newUser;
    //   await newUserProfile.save({session: userSession});

    //   await userSession.commitTransaction();

    //   return newUser;
    // }
    // catch (err) {
    //   await userSession.abortTransaction();
    //   throw err;
    // }
    // finally {
    //   userSession.endSession();
    // }
  }

  // ----------------
  async findAll() : Promise<(IUser & Document)[]> {
    return await this.userModel.find().exec();
  }

  async findByEmail(email: string) : Promise<IUser & Document> {
    return await this.userModel.findOne({'email': email}).exec();
  }

  // ----------------
  async findByEmailOrHandle(emailOrHandle: string) : Promise<IUser & Document> {
    const filter = {$or: [{'email': emailOrHandle}, {'handle': emailOrHandle }]};
    return await this.userModel.findOne(filter).exec();
  }

  // ----------------
  async findById(id: string) : Promise<IUser & Document> {
    return await this.userModel.findById(id).exec();
  }

  // ----------------
  async findByHandle(handle: string) : Promise<IUser & Document> {
    return await this.userModel.findOne({'handle': handle}).exec();
  }
  // ----------------
  async update(user: IUser) : Promise<IUser & Document> {

    // not a good approach as the validators and events are not invoked on the schema
    // let updatedUser = await this.userModel.findOneAndUpdate(
    //   {'_id': user.id},
    //   user,
    //   { new: true}
    // );

    let existingUser = await this.findById(user.id);
    existingUser = Object.assign(existingUser, user);

    return await existingUser.save();
  }
  // other methods...

}
