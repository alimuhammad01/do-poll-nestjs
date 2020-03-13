import { IUserRegistration } from './user-registration.interface'; 

export interface IUser extends IUserRegistration {
  id: string; 
  
  profile_image_url: string;
  cover_image_url: string;
  gender: string; 

  created_at: Date;
  updated_at: Date;
}
