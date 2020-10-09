import mongoose, { Schema } from "mongoose";
import { IMessage } from "./types";

const MessageSchema = new mongoose.Schema({
  hash: {
    iv: { type: String, required: true },
    content: { type: String, required: true },
  },
  key: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  hash_validation: { type: String, required: true },
});

export default mongoose.model<IMessage>("Message", MessageSchema);
