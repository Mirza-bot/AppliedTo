import { useEffect } from "react";
import { useAuthStore } from "../../features/store/auth";
import ApplicationListItem from "../components/layout/ApplicationListItem";
import { useNavigate } from "react-router-dom";
import ListMenu from "../components/layout/ListMenu";
import { useApplicationStore } from "../../features/store/applications";
import { shallow } from "zustand/shallow";
import { AiOutlineFileAdd } from "react-icons/ai";
import { motion } from "framer-motion";

function ApplicationList() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state._id);
  const applications = useApplicationStore((state) => state.applications);
  const getApplications = useApplicationStore(
    (state) => state.sortApplicationsBy,
    shallow
  );
  const sortByValue = useApplicationStore((state) => state.sortByValue);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortByValue]);

  if (applications?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <div className="text-darkgrey">
          <div className="h-screen p-5">
            <h1 className="text-2xl font-semibold  ">No Applications yet?</h1>
            <div className="font-semibold">
              <span className="text-2xl">Create one now!</span>
              <p className="text-xl mt-5">
                You can create a new application by pressing the "Create
                Application" button in the bottom left corner.
              </p>
              <div className="flex justify-center mt-5">
                <span className="text-5xl ">{<AiOutlineFileAdd />}</span>
              </div>
            </div>
          </div>
          <ListMenu />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="flex flex-col gap-1 overflow-hidden min-h-screen">
        {applications?.map((application) => {
          return (
            <ApplicationListItem
              key={application._id}
              _id={application._id}
              companyName={application.companyName}
              jobTitle={application.jobTitle}
              jobDescription={application.jobDescription}
              createdAt={application.createdAt}
              status={application.status}
              appliedOver={application.appliedOver}
              isFavorite={application.isFavorite}
            />
          );
        })}
      </div>
      <ListMenu />
    </motion.div>
  );
}
export default ApplicationList;
