import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { motion } from "framer-motion";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    action: React.Dispatch<React.SetStateAction<string>>
  ) => {
    action(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [registerView, setRegisterView] = useState(false);

  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: 100, transition: { duration: 0.2 } }}
    >
      <div className="p-4">
        {!registerView ? <LoginForm /> : <RegisterForm />}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="text-sm text-center font-light text-blue w-full mb-3"
      >
        <button
          onClick={() => {
            setRegisterView(!registerView);
          }}
        >
          {!registerView
            ? "No registered yet? | Sign up!"
            : "Already registered? | Sing in!"}
        </button>
      </motion.div>
    </motion.div>
  );
}

export default AuthPage;
