import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../../features/store/auth";
import { motion } from "framer-motion";

//assets
import workflowGraphic from "../assets/workflow-graphic.svg";

function Login() {
  const navigate = useNavigate();
  const loggedIn = useAuthStore((state) => state._id);

  const redirect = (location: string) => {
    navigate(location);
  };

  useEffect(() => {
    if (loggedIn) navigate("/applicationList");
  }, [loggedIn, navigate]);

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0, transition: { duration: 0.2 } }}
      className="dark:text-lightgrey "
    >
      <header className="px-4 mt-10 lg:grid lg:grid-cols-8 lg:gap-4">
        <div className=" mb-8 pb-3 lg:pt-16 lg:col-start-2 lg:col-span-3">
          <div className="text-3xl font-semibold ml-3">
            Organize your applications
          </div>
          <p className="mt-5 font-medium text-lg w-11/12 mx-auto leading-loose">
            Simplify the job application process, ensuring efficiency.
            <br />
            A seamless experience for creating, tracking and storing
            applications online.
            <br />
            Easily manage and organize your applications and documents across
            your devices.
          </p>
        </div>
        <div className="flex justify-center rounded my-14 dark:bg-primary p-3 lg:col-span-3 ">
          <img
            src={workflowGraphic}
            alt="workflow graphic"
            className="lg:w-full lg:max-w-md lg:h-auto"
          />
        </div>
      </header>
      <button
        onClick={() => {
          redirect("/login");
        }}
        className="lg:max-w-md bg-primary dark:text-primary dark:bg-darkPrimary dark:active:bg-darkAccent dark:active:text-darkSecondary text-white text-xl font-medium w-9/12 h-14 rounded-md mx-auto my-20 block  active:bg-accent active:text-secondary transition-colors  select-none"
      >
        Get Started
      </button>
      <div className="text-sm text-center font-light text-blue dark:text-secondary w-full mb-3  ">
        <button>Development & Design by Malkoc Mirza</button>
      </div>
    </motion.div>
  );
}

export default Login;
