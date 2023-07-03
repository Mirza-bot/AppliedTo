import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { login, register } from "../fetching";

interface State {
  user: null;
  register: (email: string, password: string, name: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// Get user from local storage
const storageData = JSON.parse(localStorage.getItem("user") as string);

export const useAuthStore = create(
  devtools<State>((set) => ({
    user: storageData ? storageData : null,
    register: async (email: string, password: string, name: string) => {
      const response = await register(email, password, name);
      set({
        user: response,
      });
    },
    login: async (email: string, password: string) => {
      const response = await login(email, password);
      set({
        user: response,
      });
    },
    logout: () => localStorage.removeItem("user"),
  }))
);
