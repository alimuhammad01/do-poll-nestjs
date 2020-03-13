import { Schema } from 'mongoose';

import { BasicSchemaOptions } from '../../common/schema/basic-schema.options';


//-------------
export const AddressSchema = new Schema({   
  line1: {
    type: String,
    default: ''
  },
  line2: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },       
  latitude : {
    type : Number,
    default : null
  },
  longitude : {
    type : Number ,
    default : null
  },
}, BasicSchemaOptions.getOptions('address'));