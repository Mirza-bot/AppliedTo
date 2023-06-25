import mongoose, { Schema } from "mongoose";
import { User } from "../../shared/types";

const userSchema = new Schema<User>(
  {
    name: { type: String, required: [true, "please add an username"] },
    email: { type: String, required: [true, "please add an email"] },
    password: { type: String, required: [true, "please add a password"] },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
