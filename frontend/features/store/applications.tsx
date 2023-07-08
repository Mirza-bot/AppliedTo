import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createApplication, getApplications } from "../fetching";
import { Application } from "../../../shared/types";
import { useAuthStore } from "./auth";

const user = useAuthStore.getState().user;
const token = useAuthStore.getState().token;

interface State {
  activeApplication: Application | null;
  applications: Application[] | null;
  saveApplication: (
    jobTitle: string,
    companyName: string,
    jobDescription: string,
    appliedOver: string,
    isFavorite: boolean
  ) => void;
  setActiveApplication: (application: Application) => void;
  clearActiveApplication: () => void;
}

export const useApplicationStore = create(
  devtools<State>((set) => ({
    activeApplication: null,
    applications: null,
    saveApplication: async (
      jobTitle,
      companyName,
      jobDescription,
      appliedOver,
      isFavorite
    ) => {
      const newApplication = {
        jobTitle: jobTitle,
        companyName: companyName,
        jobDescription: jobDescription,
        appliedOver: appliedOver,
        userId: user?._id as string,
        isFavorite: isFavorite,
      };
      const response = await createApplication(token, newApplication);
      set({ activeApplication: response.data });
    },
    setActiveApplication: (targetApplication: Application) => {
      set({ activeApplication: targetApplication });
    },
    clearActiveApplication: () => {
      set({ activeApplication: null });
    },
    getAllApplications: async () => {
      const response = await getApplications(token, JSON.stringify(user));
      set({ applications: response.data });
      console.log(response);
    },
  }))
);
