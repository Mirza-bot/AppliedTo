import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { login, register, updateUser } from "../fetching";
import { Settings, UserData } from "../../../shared/types";
import useSettingsStore from "./settings";

interface State {
  _id: string | null;
  email: string | null;
  name: string | null;
  settings?: Settings | null;
  token?: string | null;
  register: (email: string, password: string, name: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  update: () => void;
  setSettings: (settings: Settings) => void;
}

// Get user from local storage
const storageData = JSON.parse(
  localStorage.getItem("user") as string
) as UserData;

// Handle settings in own store
const settings = useSettingsStore.getState();
export const useAuthStore = create(
  devtools<State>((set, get) => ({
    _id: storageData ? storageData._id : null,
    email: storageData ? storageData.email : null,
    name: storageData ? storageData.name : null,
    documents: storageData ? storageData.documents : null,
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
      settings.setSettings(settings);
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
      settings.setSettings(settings);
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
    //##########################################################################################################
    update: async () => {
      const user = get();
      const response = await updateUser(
        user?.token ?? "",
        user?.name ?? "",
        user?.settings ?? ({} as Settings)
      );
    },
    setSettings: (settings) => {
      set({ settings: settings });
      get().update();
    },
  }))
);
