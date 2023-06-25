import { create } from "zustand";
import { UserData, UserDocuments } from "../../../shared/types";

export const useUserStore = create<UserData>((set) => ({
  id: "test",
  name: "test",
  email: "sdasada",
  password: "test13",
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
