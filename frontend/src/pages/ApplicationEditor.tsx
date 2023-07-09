import ApplicationForm from "../components/forms/ApplicationForm";
import { motion } from "framer-motion";

function ApplicationEditor() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="select-none"
    >
      <h1 className="text-2xl mt-7 ml-5 font-medium ">
        Create a new application
      </h1>
      <div className="mt-16 mx-5">
        <ApplicationForm />
      </div>
    </motion.div>
  );
}
export default ApplicationEditor;
