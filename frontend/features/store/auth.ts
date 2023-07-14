import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { login, register } from "../fetching";
import { UserData } from "../../../shared/types";

interface State {
  _id: string | null;
  email: string | null;
  name: string | null;
  settings?: string[] | null;
  token?: string | null;
  register: (email: string, password: string, name: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// Get user from local storage
const storageData = JSON.parse(
  localStorage.getItem("user") as string
) as UserData;

export const useAuthStore = create(
  devtools<State>((set) => ({
    _id: storageData ? storageData._id : null,
    email: storageData ? storageData.email : null,
    name: storageData ? storageData.name : null,
    documents: storageData ? storageData.documents : null,
    applications: storageData ? storageData.applications : null,
    settings: storageData ? storageData.settings : null,
    token: storageData ? storageData.token : null,
    //#########################################################################################################
    register: async (email: string, password: string, name: string) => {
      const response = await register(email, name, password);
      const userData = response as UserData;
      set({
        _id: userData._id,
        email: userData.email,
        name: userData.name,
        settings: userData.settings,
        token: userData.token,
      });
    },
    //#########################################################################################################
    login: async (email: string, password: string) => {
      const response = (await login(email, password)) as UserData;
      set({
        _id: response._id,
        email: response.email,
        name: response.name,
        settings: response.settings,
        token: response.token,
      });
    },
    //#########################################################################################################
    logout: () => {
      localStorage.removeItem("user");
      set({
        _id: null,
        email: null,
        name: null,
        settings: null,
        token: "",
      });
    },
  }))
);
