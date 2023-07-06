import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getDocuments } from "../fetching";
import { useAuthStore } from "./auth";

const user: any = useAuthStore.getState().user;

interface State {
  documents: null;
  load: () => void;
}

export const useDocumentsStore = create(
  devtools<State>((set) => ({
    documents: null,
    load: async () => {
      const response = await getDocuments(user.documents);
      set({ documents: response.data });
    },
  }))
);
