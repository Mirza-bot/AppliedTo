//every any is a placeholder
interface User {
  email: string;
  name: string;
  password: string;
}

interface UserData extends User {
  id: string;
  documents: [UserDocuments] | null;
  applications: [Application] | null;
  settings: Settings;
}

interface JobListing {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  listingId: string;
  date: Date;
}

interface Application extends JobListing {
  appliedOver: string;
  applicationId: string;
  cvId: string;
  clId: string;
}

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

export type { User, UserData, UserDocuments };
