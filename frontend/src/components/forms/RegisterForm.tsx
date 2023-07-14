import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../../features/store/auth";
import CustomInput from "../layout/CustomInput";
import useStatusStore from "../../../features/store/status";
import LoadingSpinner from "../LoadingSpinner";

interface Props {
  afterSubmit: (value: boolean) => void;
}

function RegisterForm(props: Props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  //State functions
  const registerUser = useAuthStore((state) => state.register);
  const loading = useStatusStore((state) => state.isLoading);
  const status = useStatusStore((state) => state);

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
      props.afterSubmit(false);
      status.setMessage("Registered");
      status.setSuccess();
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

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
            labelClass="text-lightgrey"
            inputClass="focus:border-secondary"
          />

          <CustomInput
            label="Username"
            type="text"
            id="username"
            event={setUsername}
            labelClass={`${nameError ? "text-red" : "text-lightgrey"}`}
            inputClass="focus:border-secondary"
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
            labelClass="text-lightgrey"
            inputClass="focus:border-secondary"
          />
          <CustomInput
            label="Repeat password"
            type="password"
            id="r-password"
            event={setRPassword}
            labelClass={`${passwordError ? "text-red" : "text-lightgrey"}`}
            inputClass="focus:border-secondary"
          />
          {passwordError && (
            <span className="text-red text-sm">
              Passwords must be the same.
            </span>
          )}
          <button
            type="submit"
            className="bg-secondary text-black text-xl font-medium w-9/12 h-12 rounded-md mx-auto mt-2 block  active:bg-accent active:text-secondary transition-colors  select-none"
          >
            Register
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default RegisterForm;
