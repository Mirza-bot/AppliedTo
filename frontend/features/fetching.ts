import axios from "axios";

const URL = "http://localhost:8210/api/";

// Register and Login functions

const register = async (email: string, name: string, password: string) => {
  const request = await axios.post(
    URL + "users/register",
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
  console.log(request.data.message);
  return request.data;
};

const login = async (email: string, password: string) => {
  const request = await axios.post(
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
  console.log(request.data);
  return request.data;
};

export { register, login };
