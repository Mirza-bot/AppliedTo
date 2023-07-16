import { useEffect, useState } from "react";
import { useAuthStore } from "../../features/store/auth";
import ApplicationListItem from "../components/layout/ApplicationListItem";
import { useNavigate } from "react-router-dom";
import ListMenu from "../components/layout/ListMenu";
import { useApplicationStore } from "../../features/store/applications";
import ReactDOM from "react-dom";
import { shallow } from "zustand/shallow";
import {
  AiFillStar,
  AiOutlineFileAdd,
  AiOutlineStar,
  AiOutlineEdit,
} from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { TiArrowSync } from "react-icons/ti";

import { motion } from "framer-motion";
import ApplicationView from "./ApplicationView";
import DeleteModal from "../components/DeleteModal";
import StatusModal from "../components/StatusModal";
import { Application } from "../../../shared/types";
import ApplicationEditForm from "../components/forms/ApplicationEditForm";
import SuccessNotification from "../components/SuccessNotification";

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
  const {
    applications,
    activeApplication,
    setActiveApplication,
    editApplication,
  } = useApplicationStore((state) => state);
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
    const container = document.getElementById("applicationList");

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const id = element.getAttribute("id");

      const matchingObject = foundBySearch.find((obj) => obj._id === id);

      if (matchingObject) {
        element.classList.add("animate-pulse");
        console.log(element);

        setTimeout(() => {
          element.classList.remove("animate-pulse");
        }, 6000);
        const scrollOffset = -70;
        const elementPosition = element.getBoundingClientRect().top;
        const scrollPosition = elementPosition + window.scrollY + scrollOffset;
        if (window.innerWidth > 1024 && container) {
          container.scrollTo({ top: scrollPosition, behavior: "smooth" });
        } else {
          window.scrollTo({ top: scrollPosition, behavior: "smooth" });
        }
        resetFoundApplications();
        break;
      }
    }
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const deleteApplication = useApplicationStore(
    (state) => state.deleteApplication
  );

  const editStatus = (status: string) => {
    const updatedApplication = {
      ...activeApplication,
      status: status,
    };
    setActiveApplication(updatedApplication as Application);
    editApplication(updatedApplication as Application);
  };

  const editFavorite = (isFavorite: boolean) => {
    const updatedApplication = {
      ...activeApplication,
      isFavorite: isFavorite,
    };
    setActiveApplication(updatedApplication as Application);
    editApplication(updatedApplication as Application);
  };

  const [applicationEditOpen, setApplicationEditOpen] =
    useState<boolean>(false);

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
        <div className="text-darkgrey dark:text-lightgrey">
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
      className="lg:overflow-hidden lg:h-screen"
    >
      <div className="lg:grid lg:grid-cols-3 ">
        <div
          id="applicationList"
          className=" flex flex-col gap-1 min-h-screen lg:h-screen overflow-y-scroll overflow-x-hidden"
        >
          <div className=" hidden bg-white dark:bg-darkSecondary dark:border-secondary dark:text-lightgrey lg:flex justify-between p-1 text-xs lg:text-sm border-t-2 border-grey ">
            {Object.entries(statusData).map(([status, count]) => (
              <div key={status} className="">
                {status.charAt(0).toUpperCase() + status.slice(1)}: {count}
              </div>
            ))}
          </div>
          {applications?.map((application) => {
            if (application.status !== "Archived") {
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
            }
          })}
        </div>
        {deleteModalOpen &&
          ReactDOM.createPortal(
            <DeleteModal
              onDelete={() => {
                deleteApplication(activeApplication?._id as string);
                setDeleteModalOpen(false);
                setActiveApplication(
                  activeApplication
                    ? applications[applications.indexOf(activeApplication) - 1]
                    : applications[0]
                );
              }}
              onCancel={() => {
                setDeleteModalOpen(false);
              }}
            />,
            document.getElementById("root") as Element
          )}
        {statusModalOpen &&
          ReactDOM.createPortal(
            <StatusModal
              onCancel={() => {
                setStatusModalOpen(false);
              }}
              editStatus={editStatus}
              companyName={activeApplication?.companyName as string}
              jobTitle={activeApplication?.jobTitle as string}
              status={activeApplication?.status}
              _id={activeApplication?._id}
              jobDescription=""
            />,
            document.getElementById("root") as Element
          )}
        <div className="hidden lg:block lg:col-span-2 text-xl mt-2">
          <div
            className={`${activeApplication ? "" : ""} flex justify-end mr-2`}
          >
            <div className="flex justify-evenly w-96">
              <button
                onClick={() =>
                  editFavorite(!activeApplication?.isFavorite as boolean)
                }
                className={`${
                  activeApplication?.isFavorite
                    ? "text-yellow outline"
                    : " bg-darkgrey text-grey"
                }    rounded p-1 flex text-2xl`}
              >
                {" "}
                <span className="mt-0.5">
                  {activeApplication?.isFavorite ? (
                    <AiFillStar />
                  ) : (
                    <AiOutlineStar />
                  )}
                </span>
                <span
                  className={`${
                    activeApplication?.isFavorite
                      ? " text-black dark:text-lightgrey"
                      : " text-grey bg-darkgrey "
                  } text-xl`}
                >
                  Favorite
                </span>
              </button>
              <button
                onClick={() => setApplicationEditOpen(!applicationEditOpen)}
                className={`${
                  applicationEditOpen
                    ? "bg-blue text-lightgrey animate-pulse "
                    : "bg-grey"
                } flex py-1 pl-1 pr-2 rounded`}
              >
                <span className="text-2xl mt-0.5">
                  <AiOutlineEdit />
                </span>
                Edit
              </button>
              <button
                className="flex bg-primary py-1 pl-1 pr-2 rounded"
                onClick={() => setStatusModalOpen(true)}
              >
                <span className="text-2xl mt-0.5">
                  <TiArrowSync />
                </span>
                Status
              </button>
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="flex bg-red py-1 pl-1 pr-2 rounded"
              >
                <span className="text-2xl mt-0.5">
                  <BiTrash />
                </span>
                Delete
              </button>
            </div>
          </div>
          {applicationEditOpen ? (
            <div className="p-6">
              <ApplicationEditForm />
              <SuccessNotification />
            </div>
          ) : (
            <ApplicationView />
          )}
        </div>
      </div>

      <div className="lg:hidden sticky z-10 bottom-0">
        <div className="bg-white dark:bg-darkSecondary dark:border-secondary dark:text-lightgrey flex justify-between p-1 text-xs lg:text-sm border-t-2 border-grey sm:px-5">
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
