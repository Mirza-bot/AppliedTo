import { useState } from "react";
import { motion } from "framer-motion";
import { register } from "../../features/fetching";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    action: React.Dispatch<React.SetStateAction<string>>
  ) => {
    action(event.target.value);
  };

  const submitForm = () => {
    if (email && username && password) {
      register(email, username, password);
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
        <div className="bg-primary p-5 rounded border-2 border-secondary flex flex-col text-center">
          <label
            htmlFor="email"
            className="text-left font-semibold text-lightgrey"
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
            htmlFor="username"
            className="text-left font-semibold text-lightgrey"
          >
            Username
          </label>
          <input
            className="bg-white rounded text-xl mb-3"
            type="text"
            name="username"
            required
            onChange={(e) => handleInput(e, setUsername)}
          />
          <label
            htmlFor="password"
            className="text-left font-semibold text-lightgrey"
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
          <label
            htmlFor="repeat-password"
            className="text-left font-semibold text-lightgrey"
          >
            Repeat password
          </label>
          <input
            className="bg-white text-xl rounded mb-3"
            type="password"
            name="repeat-password"
            required
            onChange={(e) => handleInput(e, setPassword)}
          />
          <button
            onClick={submitForm}
            type="submit"
            className="bg-secondary text-accent text-xl font-medium w-9/12 h-12 rounded-md mx-auto mt-2 block  active:bg-accent active:text-secondary transition-colors  select-none"
          >
            Register
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default RegisterForm;
