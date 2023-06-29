import { File } from "buffer";
import { Types } from "mongoose";

//every any is a placeholder
interface User {
  email: string;
  name: string;
  password?: string;
  token?: string;
  documents?: [Types.ObjectId] | [File];
  applications?: [Types.ObjectId] | [File];
  settings?: Settings;
  avatar?: File;
}

interface UserData extends User {
  _id: string;
}

interface JobListing {
  userId: Types.ObjectId;
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  date: Date;
  _id: string;
}

interface Application extends JobListing {
  appliedOver?: string;
  cvId?: string;
  clId?: string;
  notes?: Notes;
  isFavorite?: boolean;
}

type Notes = [note: string];

interface Settings {
  darkMode: boolean;
  searchPreferences: Object;
}

/**
 * for cover letters and cv's
 */
interface UserDocuments {
  userId: string;
  name: string;
  file: File;
}

export type { User, UserData, UserDocuments, Application, Notes };
