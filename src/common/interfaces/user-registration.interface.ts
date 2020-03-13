export interface IUserRegistration {
  email: string;
  password: string;

  first_name: string;
  last_name: string;
  display_name: string;

  dob: Date;
  handle: string;
  referral?: string;
}