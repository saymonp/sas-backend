import { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export interface IMessage extends Document {
  hash: {
    iv: string;
    content: string;
  };
  key: string;
  user_id: Schema.Types.ObjectId;
  hash_validation: string;
}
