import { useState } from "react";
import { motion } from "framer-motion";
import { login } from "../../features/fetching";
import { User } from "../../../shared/types";
import { useAuthStore } from "../../features/store/auth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //State
  const authStore = useAuthStore();

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    action: React.Dispatch<React.SetStateAction<string>>
  ) => {
    action(event.target.value);
  };

  const submitForm = async () => {
    const loginData = (await login(email, password)) as User;
    authStore.email = loginData.email;
    authStore.name = loginData.name;
    authStore.token = loginData.token;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div>
        <header className="text-3xl font-semibold mb-6">Login</header>
        <div className="bg-secondary p-5 rounded border-2 border-primary flex flex-col text-center">
          <label
            htmlFor="email"
            className="text-left font-semibold text-darkgrey"
          >
            E-Mail
          </label>
          <input
            className="bg-white rounded text-xl mb-3"
            type="email"
            name="email"
            required
            onChange={(e) => handleInput(e, setEmail)}
          />
          <label
            htmlFor="email"
            className="text-left font-semibold text-darkgrey"
          >
            Password
          </label>
          <input
            className="bg-white text-xl rounded mb-3"
            type="password"
            name="password"
            required
            onChange={(e) => handleInput(e, setPassword)}
          />
          <button
            onClick={submitForm}
            type="submit"
            className="bg-primary text-white text-xl font-medium w-9/12 h-12 rounded-md mx-auto mt-2 block  active:bg-accent active:text-secondary transition-colors  select-none"
          >
            Login
          </button>
        </div>
      </div>
    </motion.div>
  );
}
export default LoginForm;
