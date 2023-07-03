import axios, { AxiosError } from "axios";
import useStatusStore from "./store/status";

const URL = "http://localhost:8210/api/";

//Error handling in frontend
const status = useStatusStore.getState();

interface ErrorMessage {
  message: string;
}

// Register and Login functions
const register = async (email: string, name: string, password: string) => {
  status.setLoading();
  try {
    const response = await axios.post(
      URL + "user/register",
      {
        email: email,
        name: name,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    status.setSuccess();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const statusCode = axiosError.response?.status;
      const errorMessage = axiosError.response?.data as ErrorMessage;

      status.setError();
      status.setErrorCode(statusCode as number);
      status.setMessage(errorMessage?.message);
    }
    throw error;
  }
};

const login = async (email: string, password: string) => {
  status.setLoading();
  try {
    const response = await axios.post(
      URL + "user/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    status.setSuccess();
    localStorage.removeItem("inputMail");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const statusCode = axiosError.response?.status;
      const errorMessage = axiosError.response?.data as ErrorMessage;

      status.setError();
      status.setErrorCode(statusCode as number);
      status.setMessage(errorMessage?.message);
    }
    throw error;
  }
};

export { register, login };
