import mongoose, { Schema } from "mongoose";
import { UserData } from "../../shared/types";

const userSchema = new Schema<UserData>(
  {
    name: { type: String, required: [true, "please add an username"] },
    email: { type: String, required: [true, "please add an email"] },
    password: { type: String, required: [true, "please add a password"] },
    documents: { type: Buffer, required: false },
    applications: { type: Array, required: false },
    settings: { type: Object, required: false },
    avatar: { type: Buffer, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
