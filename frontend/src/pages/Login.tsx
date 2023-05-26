import { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { setUser } from "../store/slice/userSlice";

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    action: React.Dispatch<React.SetStateAction<string>>
  ) => {
    action(event.target.value);
  };

  const [registerView, setRegisterView] = useState(false);

  const registerUser = () => {
    dispatch(
      setUser({
        email: email,
        username: username,
        password: password,
      })
    );
  };
  return (
    <>
      <div>
        <div className="w-full text-center bg-emerald-500 py-3">
          <span className="text-3xl text-white">
            Applied.<strong className="text-emerald-950">To</strong>
          </span>
        </div>
      </div>
      <div className="px-4">
        <div className="bg-white rounded p-3 my-5">
          <span className="text-2xl font-bold">What it provides?</span>
          <p className="mt-3">
            Efficiency is key, and this web app simplifies the job application
            process, providing you with a comprehensive overview of your
            employment journey with a seamless experience for creating,
            tracking, and storing your applications online.
          </p>
        </div>
        {!registerView ? (
          <div>
            <div className="bg-emerald-500 p-5 rounded flex flex-col text-center mb-2">
              <input
                className="bg-white rounded text-xl mb-3"
                type="email"
                placeholder=" Email"
                required
                onChange={(e) => handleInput(e, setEmail)}
              />

              <input
                className="bg-white text-xl rounded mb-3"
                type="password"
                placeholder=" Password"
                required
                onChange={(e) => handleInput(e, setPassword)}
              />
              <button
                type="submit"
                className="bg-white font-bold w-20 self-center rounded p-1 text-emerald-700 active:text-white active:bg-emerald-400 hover:ring-1 hover:ring-emerald-300 select-none"
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <span
                className="text-blue-700 text-sm"
                onClick={() => setRegisterView(!registerView)}
              >
                Not registered yet? | Register now
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-emerald-500 p-5 rounded flex flex-col text-center mb-2">
              <input
                className="bg-white rounded text-xl mb-3"
                type="email"
                placeholder=" Email"
                required
                onChange={(e) => handleInput(e, setEmail)}
              />
              <input
                className="bg-white rounded text-xl mb-3"
                type="text"
                placeholder=" Username"
                required
                onChange={(e) => handleInput(e, setUsername)}
              />
              <input
                className="bg-white text-xl rounded mb-3"
                type="password"
                placeholder=" Password"
                required
                onChange={(e) => handleInput(e, setPassword)}
              />
              <button
                type="submit"
                className="bg-white font-bold w-20 self-center rounded p-1 text-emerald-700 active:text-white active:bg-emerald-400 hover:ring-1 hover:ring-emerald-300 select-none"
                onClick={() => registerUser()}
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <span
                className="text-blue-700 text-sm"
                onClick={() => setRegisterView(!registerView)}
              >
                Already registered? | Login now
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
