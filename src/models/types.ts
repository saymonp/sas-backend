import { Document } from 'mongoose';


export interface IUser extends Document {
    user_id?: string;
    name: string,
    email: string,
    password: string,
  }