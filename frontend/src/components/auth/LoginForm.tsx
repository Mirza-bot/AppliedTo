import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../../features/store/auth";
import CustomInput from "../layout/CustomInput";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //State functions
  const loginUser = useAuthStore((state) => state.login);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div>
        <header className="text-3xl font-semibold mb-6">Login</header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginUser(email, password);
            localStorage.setItem("inputMail", email);
          }}
          className="bg-secondary p-5 rounded border-2 border-primary flex flex-col text-center"
        >
          <CustomInput
            label="E-Mail"
            type="email"
            id="email"
            labelColor="text-darkgrey"
            value={localStorage.getItem("inputMail") as string}
            event={setEmail}
          />
          <CustomInput
            label="Password"
            type="password"
            id="password"
            labelColor="text-darkgrey"
            event={setPassword}
          />
          <button
            type="submit"
            className="bg-primary text-white text-xl font-medium w-9/12 h-12 rounded-md mx-auto mt-2 block  active:bg-accent active:text-secondary transition-colors  select-none"
          >
            Login
          </button>
        </form>
      </div>
    </motion.div>
  );
}
export default LoginForm;
