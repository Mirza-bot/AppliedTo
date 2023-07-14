import mongoose, { Schema } from "mongoose";
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
    userId: { type: String, required: true },
    notes: { type: Schema.Types.Array, required: false },
    isFavorite: { type: Boolean, required: false },
    status: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
