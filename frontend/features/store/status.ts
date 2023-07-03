import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StatusState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorCode: number | null;
  message: string | null;
  setLoading: () => void;
  setSuccess: () => void;
  setError: () => void;
  setErrorCode: (code: number) => void;
  setMessage: (message: string) => void;
  resetStatus: () => void;
}

export const useStatusStore = create(
  devtools<StatusState>((set) => ({
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorCode: null,
    message: null,
    setLoading: () => {
      set({ isLoading: true, isSuccess: false, isError: false });
    },
    setSuccess: () => {
      set({ isLoading: false, isSuccess: true, isError: false });
    },
    setError: () => {
      set({ isLoading: false, isSuccess: false, isError: true });
    },
    setErrorCode: (code: number) => {
      set({ errorCode: code });
    },
    setMessage: (msg: string) => {
      set({ message: msg });
    },
    resetStatus: () => {
      set({
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: null,
      });
    },
  }))
);

export default useStatusStore;
