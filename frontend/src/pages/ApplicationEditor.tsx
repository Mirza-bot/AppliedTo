import { useLocation } from "react-router-dom";
import ApplicationForm from "../components/forms/ApplicationForm";
import ApplicationEditForm from "../components/forms/ApplicationEditForm";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function ApplicationEditor() {
  const location = useLocation();
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === "/application/edit") {
      setEditMode(true);
    }
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="select-none dark:text-lightgrey"
    >
      <h1 className="text-2xl mt-10 ml-5 font-medium ">
        {editMode ? "Edit application" : "Create a new application"}
      </h1>
      <div className="mt-4 mx-5">
        {editMode ? <ApplicationEditForm /> : <ApplicationForm />}
      </div>
    </motion.div>
  );
}
export default ApplicationEditor;
