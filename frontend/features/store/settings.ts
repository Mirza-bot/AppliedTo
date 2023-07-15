import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Settings, UserData } from "../../../shared/types";
import { useAuthStore } from "./auth";

interface SettingsState {
  setSettings: (settings: Settings) => void;
  //Dark Mode
  darkMode: boolean;
  language: string;
  setDarkMode: (value: boolean) => void;
  saveSettings: () => void;
}

const storageData: UserData | null = JSON.parse(
  localStorage.getItem("user") as string
);

export const useSettingsStore = create(
  devtools<SettingsState>((set, get) => ({
    setSettings: (settings) => {
      set({ darkMode: settings.darkMode, language: settings.language });
    },
    //Dark Mode
    darkMode: storageData ? (storageData.settings?.darkMode as boolean) : false,
    setDarkMode: (value) => {
      set({ darkMode: value });
    },
    //Language
    language: "english",
    //Save settings
    saveSettings: async () => {
      const currentSettings = {
        darkMode: get().darkMode,
        language: get().language,
      };
      const userStore = useAuthStore.getState();
      userStore.setSettings(currentSettings);
    },
  }))
);

export default useSettingsStore;
