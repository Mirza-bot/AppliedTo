import { useEffect } from "react";
import { useAuthStore } from "../../features/store/auth";
import ApplicationListItem from "../components/layout/ApplicationListItem";
import { useNavigate } from "react-router-dom";
import ListMenu from "../components/layout/ListMenu";
import { useApplicationStore } from "../../features/store/applications";
import { shallow } from "zustand/shallow";
import useStatusStore from "../../features/store/status";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiOutlineFileAdd } from "react-icons/ai";

function ApplicationList() {
  const loading = useStatusStore((state) => state.isLoading);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state._id);
  const applications = useApplicationStore((state) => state.applications);
  const { getAllApplications } = useApplicationStore((state) => state, shallow);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setTimeout(() => {
        getAllApplications();
        console.log(applications);
      }, 100);
    }
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (applications?.length === 0) {
    return (
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
    );
  }

  return (
    <div>
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
            />
          );
        })}
      </div>
      <ListMenu />
    </div>
  );
}
export default ApplicationList;
