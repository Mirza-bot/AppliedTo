import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { login, register } from "../fetching";
import { UserData } from "../../../shared/types";

interface State {
  user: null;
  token: string;
  register: (email: string, password: string, name: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// Get user from local storage
const storageData = JSON.parse(localStorage.getItem("user") as string);

export const useAuthStore = create(
  devtools<State>((set) => ({
    user: <UserData>storageData ? storageData : null,
    token: storageData ? storageData.token : null,
    register: async (email: string, password: string, name: string) => {
      const response = await register(email, password, name);
      set({
        user: response,
        token: response.data.token,
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
