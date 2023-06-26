import mongoose, { Schema } from "mongoose";
import { UserDocuments } from "../../shared/types";

const documentSchema = new Schema<UserDocuments>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    file: { type: Schema.Types.Buffer, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Documents", documentSchema);
