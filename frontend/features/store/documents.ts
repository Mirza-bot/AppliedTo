import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getDocuments } from "../fetching";
import { useAuthStore } from "./auth";
import { UserDocument } from "../../../shared/types";

/**
 * Whole file experimental and not a real version considered for building.
 */

const user = useAuthStore.getState();

interface State {
  documents: UserDocument[] | null;
  load: () => void;
}

export const useDocumentsStore = create(
  devtools<State>((set) => ({
    documents: null,
    load: async () => {
      const response = await getDocuments(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTcyZmZiZWU5ODgyYjI3YTk1MDAxMCIsImlhdCI6MTY4ODY3OTE4MywiZXhwIjoxNjkxMjcxMTgzfQ.kXAcGczZvpgXFNQ2BVr8EUXe1AJgxboNXp735L2rllY",
        JSON.stringify(user)
      );
      const documentArray = [];
      for (const data of response) {
        const document = {
          id: data._id,
          file: data.file,
          name: data.name,
        };
        documentArray.push(document as UserDocument);
      }
      set({
        documents: documentArray,
      });
    },
  }))
);
