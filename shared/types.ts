//every any is a placeholder
interface User {
  email: string;
  name: string;
  password?: string;
  token?: string;
  documents?: [string] | [File];
  applications?: [string] | [File];
  settings?: Settings;
  avatar?: File;
}

interface UserData extends User {
  _id: string;
}

interface JobListing {
  userId: string;
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  date?: Date;
  _id?: string;
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
interface UserDocument {
  userId: string;
  id: string;
  file: { type: string; data: Array<number> };
  name: string;
}

export type { User, UserData, UserDocument, Application, Notes };
