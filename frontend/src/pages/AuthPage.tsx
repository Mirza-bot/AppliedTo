import { useEffect, useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useStatusStore from "../../features/store/status";
import { useAuthStore } from "../../features/store/auth";

function AuthPage() {
  const [registerView, setRegisterView] = useState(false);

  //States
  const status = useStatusStore();
  const authorized = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (status.isSuccess && authorized.user) {
      // #####################################
      // Keep on working from here, add the new site if user is logged in and authorized
      // ######################################
      navigate("/applicationList");
    }
  }, [status.isSuccess, authorized.user, navigate]);

  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: 100, transition: { duration: 0.2 } }}
      className="select-none"
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
