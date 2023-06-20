import { create } from "zustand";
import { User } from "../../../shared/types";

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
}));
