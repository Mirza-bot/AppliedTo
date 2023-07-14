import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  createApplication,
  getApplications,
  deleteApplication,
  editApplication,
} from "../fetching";
import { Application, ApplicationArray } from "../../../shared/types";
import { useAuthStore } from "./auth";

interface State {
  activeApplication: Application | null;
  applications: ApplicationArray;
  foundBySearch: ApplicationArray;
  sortByValue: string;
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
  getAllApplications: () => Promise<ApplicationArray>;
  deleteApplication: (applicationId: string) => void;
  editApplication: (application: Application) => void;
  sortApplicationsBy: (sortBy?: string) => void;
  setSortByValue: (value: string) => void;
  searchApplication: (searchFor: string) => void;
  resetFoundApplications: () => void;
}

export const useApplicationStore = create(
  devtools<State>((set, get) => ({
    activeApplication: null,
    applications: [],
    foundBySearch: [],
    sortByValue: "date",
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
      get().sortApplicationsBy();
    },
    setActiveApplication: (targetApplication: Application) => {
      set({ activeApplication: targetApplication });
    },
    clearActiveApplication: () => {
      set({ activeApplication: null });
    },
    getAllApplications: async (): Promise<ApplicationArray> => {
      const token = useAuthStore.getState().token;
      const userId = useAuthStore.getState()._id;
      const response = await getApplications(token as string, userId as string);
      if (!response) {
        return [] as ApplicationArray;
      }
      set({ applications: response });
      const applications = get().applications;
      return applications as ApplicationArray;
    },
    deleteApplication: async (applicationId: string) => {
      const token = useAuthStore.getState().token;
      const userId = useAuthStore.getState()._id;
      await deleteApplication(token as string, userId as string, applicationId);
      get().sortApplicationsBy();
    },
    editApplication: async (application: Application) => {
      const token = useAuthStore.getState().token;
      await editApplication(token as string, application);
      get().sortApplicationsBy();
    },

    /**
     * Returns the fetched applications sorted by the given value
     * @param sortBy string: "company", "position", "appliedOver", "status"
     * @returns the sorted Array as <ApplicationsArray>
     */
    sortApplicationsBy: async () => {
      const applications = await get().getAllApplications();
      if (applications.length === 0) {
        return [];
      }
      const sortedArray: Application[] = [...applications];
      const sortBy = get().sortByValue;
      switch (sortBy) {
        case "company":
          sortedArray.sort((a, b) =>
            a.companyName.localeCompare(b.companyName)
          );
          break;
        case "position":
          sortedArray.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
          break;
        case "date":
          sortedArray.sort(
            (a, b) =>
              new Date(a.createdAt ?? 0).getTime() -
              new Date(b.createdAt ?? 0).getTime()
          );
          break;
        case "appliedOver":
          sortedArray.sort((a, b) => {
            // Fallback to an empty string if undefined
            const appliedOverA = a.appliedOver || "";
            const appliedOverB = b.appliedOver || "";
            return appliedOverA.localeCompare(appliedOverB);
          });
          break;
        case "status":
          sortedArray.sort((a, b) => {
            const statusA = a.status || "";
            const statusB = b.status || "";
            return statusA.localeCompare(statusB);
          });
          break;
        case "isFavorite":
          sortedArray.sort((a, b) => {
            return a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1;
          });
          break;
        default:
          return;
      }
      set({ applications: sortedArray });
    },
    setSortByValue: (value: string) => {
      set({ sortByValue: value });
    },
    searchApplication: (searchFor: string) => {
      const applications = get().applications;
      const searchValue = searchFor.toLowerCase().trim();
      const matchingApplications = applications.filter((application) => {
        return Object.values(application).some((value) => {
          if (
            typeof value === "string" &&
            ![
              "Applied",
              "Interviewing",
              "Ghosted",
              "Archived",
              "Rejected",
              "Accepted",
            ].includes(value)
          ) {
            const lowercasedValue = value.toLowerCase();
            return lowercasedValue.includes(searchValue);
          }
          return false;
        });
      });
      set({ foundBySearch: matchingApplications });
    },
    resetFoundApplications: () => {
      set({ foundBySearch: [] });
    },
  }))
);
