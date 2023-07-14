import { useEffect, useState } from "react";
import { useAuthStore } from "../../features/store/auth";
import ApplicationListItem from "../components/layout/ApplicationListItem";
import { useNavigate } from "react-router-dom";
import ListMenu from "../components/layout/ListMenu";
import { useApplicationStore } from "../../features/store/applications";
import { shallow } from "zustand/shallow";
import { AiOutlineFileAdd } from "react-icons/ai";
import { motion } from "framer-motion";

interface StatusData {
  applied: number;
  interviewing: number;
  ghosted: number;
  rejected: number;
  accepted: number;
}

function ApplicationList() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state._id);
  const { applications } = useApplicationStore((state) => state);
  const getApplications = useApplicationStore(
    (state) => state.sortApplicationsBy,
    shallow
  );
  const { sortByValue } = useApplicationStore((state) => state);
  const [statusData, setStatusData] = useState<StatusData>({
    applied: 0,
    interviewing: 0,
    ghosted: 0,
    rejected: 0,
    accepted: 0,
  });
  const { foundBySearch } = useApplicationStore((state) => state);
  const { resetFoundApplications } = useApplicationStore((state) => state);

  const getStatusCount = () => {
    let applied = 0;
    let interviewing = 0;
    let ghosted = 0;
    let rejected = 0;
    let accepted = 0;
    applications.forEach((application) => {
      switch (application.status) {
        case "Applied":
          applied++;
          break;
        case "Interviewing":
          interviewing++;
          break;
        case "Ghosted":
          ghosted++;
          break;
        case "Rejected":
          rejected++;
          break;
        case "Accepted":
          accepted++;
          break;
        default:
          return;
      }
    });
    const collectedData = {
      applied: applied,
      interviewing: interviewing,
      ghosted: ghosted,
      rejected: rejected,
      accepted: accepted,
    };
    setStatusData(collectedData);
  };

  const scrollToFoundApplication = () => {
    const elements = document.getElementsByClassName("application_list_item");

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const id = element.getAttribute("id");

      const matchingObject = foundBySearch.find((obj) => obj._id === id);

      if (matchingObject) {
        const scrollOffset = -70;
        const elementPosition = element.getBoundingClientRect().top;
        const scrollPosition = elementPosition + window.scrollY + scrollOffset;
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
        resetFoundApplications();
        break;
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortByValue]);

  // To set the status bar after the applications array got fetched.
  useEffect(() => {
    getStatusCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applications]);

  useEffect(() => {
    scrollToFoundApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundBySearch]);

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
              notes={application.notes}
            />
          );
        })}
      </div>
      <div className="sticky z-10 bottom-0">
        <div className="bg-white flex justify-between p-1 text-xs border-t-2 border-grey">
          {Object.entries(statusData).map(([status, count]) => (
            <div key={status} className="">
              {status.charAt(0).toUpperCase() + status.slice(1)}: {count}
            </div>
          ))}
        </div>
        <ListMenu />
      </div>
    </motion.div>
  );
}
export default ApplicationList;
