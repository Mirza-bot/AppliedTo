import axios, { AxiosError } from "axios";
import useStatusStore from "./store/status";
import { Application, Settings } from "../../shared/types";

//#######################################################################################
// Before building for production this must be changed back to http://localhost:8210/api/
//#######################################################################################
const URL = "http://localhost:8210/api/";

//Error handling in frontend
const status = useStatusStore.getState();

interface ErrorMessage {
  message: string;
}

//################################################################
// Register and Login functions
//################################################################
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
          "Content-Type": "application/json",
        },
      }
    );
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
          "Content-Type": "application/json",
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

const updateUser = async (
  token: string,
  email: string,
  name: string,
  settings: Settings
) => {
  status.setLoading();

  try {
    const response = await axios.put(
      URL + "user/update",
      {
        email: email,
        name: name,
        settings: settings,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    status.setSuccess();
    localStorage.setItem("user", JSON.stringify(response.data));
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

//#############################################################
// CRUD functions for Applications
//#############################################################

const createApplication = async (
  token: string,
  newApplication: Application
) => {
  status.setLoading();
  try {
    const response = await axios.post(
      URL + "applications/create",
      newApplication,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    status.setSuccess();
    status.setMessage("Application created");
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

const getApplications = async (token: string, userId: string) => {
  status.setLoading();
  try {
    const response = await axios.get(URL + "applications/read", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId: userId,
      },
    });
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

const deleteApplication = async (
  token: string,
  userId: string,
  applicationId: string
) => {
  status.setLoading();
  try {
    const response = await axios.delete(URL + "applications/delete", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId: userId,
        _id: applicationId,
      },
    });
    status.setSuccess();
    status.setMessage(response.data);
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

const editApplication = async (token: string, application: Application) => {
  status.setLoading();
  try {
    const response = await axios.patch(
      URL + "applications/edit",
      {
        ...application,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    status.setSuccess();
    status.setMessage(response.data);
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

//#############################################################
// CRUD functions for Documents
//#############################################################

const getDocuments = async (token: string, user: string) => {
  status.setLoading();
  try {
    const response = await axios.get(URL + "documents/read", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`,
      },
      params: {
        user: user,
      },
    });
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

export {
  register,
  login,
  createApplication,
  getApplications,
  deleteApplication,
  getDocuments,
  editApplication,
  updateUser,
};
