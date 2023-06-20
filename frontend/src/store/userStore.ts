import { create } from "zustand";
import { User, UserDocuments } from "../../../shared/types";

export const useUserStore = create<User>((set) => ({
  id: "test",
  name: "test",
  email: "sdasada",
  documents: null,
  applications: null,
  settings: {
    darkMode: false,
    searchPreferences: false,
  },
  setName: (name: string) => set({ name: name }),
  setEmail: (email: string) => set({ email: email }),
  setDocuments: (documentsObj: UserDocuments) =>
    set({ documents: documentsObj }),
}));
