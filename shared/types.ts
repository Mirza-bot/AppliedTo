//every any is a placeholder
interface User {
  email: string;
  name: string;
  password: string;
}

interface UserData extends User {
  _id: string;
  documents: [UserDocuments] | null;
  applications: [Application] | null;
  settings: Settings;
}

interface JobListing {
  creatorId: string;
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
  searchPreferences: any;
}

/**
 * for cover letters and cv's
 */
interface UserDocuments {
  document?: {
    id: string;
    name: string;
    file: File;
  };
}

export type { User, UserData, UserDocuments, Application, Notes };
