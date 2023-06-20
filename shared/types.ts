//every any is a placeholder
interface User {
  id: string;
  name: string;
  email: string;
  documents: userDocuments | null;
  applications: [Application] | null;
  settings: Settings;
}

interface Job {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  listingId: string;
  date: Date;
}

interface Application extends Job {
  appliedOver: string;
  applicationId: string;
  cvId: string;
  clId: string;
}

interface Settings {
  darkMode: boolean;
  searchPreferences: any;
}

interface userDocuments {
  coverLetter?: {
    id: string;
    file: File;
  };
  cv?: {
    id: string;
    file: string;
  };
}

export type { User };
