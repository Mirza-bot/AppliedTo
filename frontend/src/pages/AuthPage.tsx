import { useEffect, useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useStatusStore from "../../features/store/status";
import LoadingSpinner from "../components/LoadingSpinner";
import SuccessNotification from "../components/SuccessNotification";
import ReactDOM from "react-dom";

function AuthPage() {
  const [registerView, setRegisterView] = useState(false);

  const authorized = localStorage.getItem("user");
  const loading = useStatusStore((state) => state.isLoading);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (authorized) {
      // #####################################
      // Keep on working from here, add the new site if user is logged in and authorized
      // ######################################
      navigate("/applicationList");
    }
  }, [authorized, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: 100, transition: { duration: 0.2 } }}
      className="select-none"
    >
      {ReactDOM.createPortal(
        <SuccessNotification />,
        document.getElementById("root") as Element
      )}
      <div className="p-4">
        {!registerView ? (
          <LoginForm />
        ) : (
          <RegisterForm afterSubmit={() => setRegisterView(false)} />
        )}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="text-sm text-center font-light text-blue dark:text-secondary w-full mb-3"
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
