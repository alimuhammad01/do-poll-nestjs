import { Schema, HookNextFunction } from 'mongoose';
import * as bcryptjs from 'bcryptjs';

import { AddressSchema, BasicSchemaOptions } from '../../common/schema';


//-------------
export const UserSchema = new Schema({  
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    default: ''
  },
  last_name: {
    type: String,
    default: ''
  },
  display_name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true
  },
  handle: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  referral: {
    type: String,
    default: ''
  },
  address: {
    type: AddressSchema,
    default: null
  },
  gender: {
    type: String,
    default: '',
    enum: ['', 'male', 'female', 'other']
  },
  profile_image_url: {
    type: String,
    default: ''
  },
  cover_image_url: {
    type: String,
    default: ''
  }
}, BasicSchemaOptions.getOptions('users'));

//-------------
UserSchema.pre('save', async function(next: HookNextFunction) {
  try {

    let user = this;

    if (user.isModified('password')) {
      let salt = await bcryptjs.genSalt(10);
      const hashed = await bcryptjs.hash(user['password'], salt);
      user['password'] = hashed;    
    }

    return next();
  }
  catch (err) {
    return next(err);
  }
});

UserSchema.pre('validate', async function(next: HookNextFunction) {
  try {

    let user = this;

    if (!user['display_name']) {
      const firstName = user['first_name'];
      const lastName = user['last_name'];

      user['display_name'] = firstName ? (firstName + (lastName ? ' ' + lastName : '')) : lastName;      
    }
    
    return next();
  }
  catch (err) {
    return next(err);
  }
});
