import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../../features/store/auth";
import CustomInput from "../CustomInput";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  //State functions
  const registerUser = useAuthStore((state) => state.register);

  const handleSubmit = () => {
    setNameError(false);
    setPasswordError(false);
    if (username.length < 5) {
      setNameError(true);
      return;
    } else if (password !== rPassword) {
      setPasswordError(true);
    } else {
      setNameError(false);
      setPasswordError(false);
      registerUser(email, password, username);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div>
        <header className="text-3xl font-semibold mb-6">Register</header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-primary p-5 rounded border-2 border-secondary flex flex-col text-center"
        >
          <CustomInput
            label="E-Mail"
            type="email"
            id="email"
            event={setEmail}
            labelColor="text-lightgrey"
          />

          <CustomInput
            label="Username"
            type="text"
            id="username"
            event={setUsername}
            labelColor={`${nameError ? "text-red" : "text-lightgrey"}`}
          />
          {nameError && (
            <span className="text-red text-sm">
              Username must contain at least 5 characters.
            </span>
          )}
          <CustomInput
            label="Password"
            type="password"
            id="password"
            event={setPassword}
            labelColor="text-lightgrey"
          />
          <CustomInput
            label="Repeat password"
            type="password"
            id="r-password"
            event={setRPassword}
            labelColor={`${passwordError ? "text-red" : "text-lightgrey"}`}
          />
          {passwordError && (
            <span className="text-red text-sm">
              Passwords must be the same.
            </span>
          )}
          <button
            type="submit"
            className="bg-secondary text-accent text-xl font-medium w-9/12 h-12 rounded-md mx-auto mt-2 block  active:bg-accent active:text-secondary transition-colors  select-none"
          >
            Register
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default RegisterForm;
