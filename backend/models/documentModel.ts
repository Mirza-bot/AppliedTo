import mongoose, { Schema } from "mongoose";
import { UserDocument } from "../../shared/types";

const documentSchema = new Schema<UserDocument>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    file: { type: Schema.Types.Buffer, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Documents", documentSchema);
