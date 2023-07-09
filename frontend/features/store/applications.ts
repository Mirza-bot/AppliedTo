import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  createApplication,
  getApplications,
  deleteApplication,
} from "../fetching";
import { Application } from "../../../shared/types";
import { useAuthStore } from "./auth";

interface State {
  activeApplication: Application | null;
  applications: Application[] | null;
  saveApplication: (
    jobTitle: string,
    companyName: string,
    jobDescription: string,
    appliedOver: string,
    isFavorite: boolean,
    status: string
  ) => void;
  setActiveApplication: (application: Application) => void;
  clearActiveApplication: () => void;
  getAllApplications: () => void;
  deleteApplication: (applicationId: string) => void;
}

export const useApplicationStore = create(
  devtools<State>((set, get) => ({
    activeApplication: null,
    applications: null,
    saveApplication: async (
      jobTitle,
      companyName,
      jobDescription,
      appliedOver,
      isFavorite,
      status
    ) => {
      const userStore = useAuthStore.getState();
      const newApplication = {
        jobTitle: jobTitle,
        companyName: companyName,
        jobDescription: jobDescription,
        appliedOver: appliedOver,
        userId: userStore._id as string,
        isFavorite: isFavorite,
        status: status,
      };
      const token = useAuthStore.getState().token;
      const response = await createApplication(token as string, newApplication);
      set({ activeApplication: response.data });
    },
    setActiveApplication: (targetApplication: Application) => {
      set({ activeApplication: targetApplication });
    },
    clearActiveApplication: () => {
      set({ activeApplication: null });
    },
    getAllApplications: async () => {
      const token = useAuthStore.getState().token;
      const userId = useAuthStore.getState()._id;
      const response = await getApplications(token as string, userId as string);
      if (!response) {
        return;
      }
      set({ applications: response });
      const applications = get().applications;
      return applications;
    },
    deleteApplication: async (applicationId: string) => {
      const token = useAuthStore.getState().token;
      const userId = useAuthStore.getState()._id;
      const response = await deleteApplication(
        token as string,
        userId as string,
        applicationId
      );
    },
  }))
);
