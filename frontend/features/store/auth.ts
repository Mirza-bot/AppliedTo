import { create } from "zustand";
import { User } from "../../../shared/types";

export const useAuthStore = create<User>(() => ({
  name: "null",
  email: "null",
  token: "null",
}));
