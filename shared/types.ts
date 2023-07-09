//every any is a placeholder
interface User {
  email: string;
  name: string;
  password?: string;
  token?: string;
  documents?: string[];
  applications?: string[];
  settings?: string[];
  avatar?: File;
}

interface UserData extends User {
  _id: string;
}

interface JobListing {
  userId?: string;
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  createdAt?: string;
  _id?: string;
}

interface Application extends JobListing {
  appliedOver?: string;
  cvId?: string;
  clId?: string;
  notes?: Notes;
  isFavorite?: boolean;
  status?: string;
}

type Notes = [note: string];

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
