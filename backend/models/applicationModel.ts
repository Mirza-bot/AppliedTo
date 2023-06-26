import mongoose, { Schema, Types } from "mongoose";
import { Application } from "../../shared/types";

const applicationSchema = new Schema<Application>(
  {
    jobTitle: { type: String, required: [true, "please add a job title."] },
    companyName: {
      type: String,
      required: [true, "please add the company name."],
    },
    jobDescription: {
      type: String,
      required: [true, "please add a description for more clarification."],
    },
    appliedOver: { type: String, required: false },
    cvId: { type: String, required: false },
    clId: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, required: true },
    notes: { type: Array, required: false },
    isFavorite: { type: Boolean, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);