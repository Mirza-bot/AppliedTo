import { useEffect, useState } from "react";
import { useApplicationStore } from "../../features/store/applications";
import ArchiveItem from "../components/layout/ArchiveItem";
import { ApplicationArray } from "../../../shared/types";
import { BiArchiveIn } from "react-icons/bi";

function Archive() {
  const { applications, getAllApplications } = useApplicationStore(
    (state) => state
  );

  const [archiveApplications, setArchiveApplications] =
    useState<ApplicationArray>([]);

  useEffect(() => {
    if (applications.length === 0) {
      getAllApplications();
    }
    const archiveItems = applications.filter(
      (application) => application.status === "Archived"
    );
    setArchiveApplications(archiveItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applications]);

  if (archiveApplications.length === 0) {
    return (
      <div className="text-grey text-2xl text-center w-full flex flex-col absolute top-1/3">
        <span>No items in the archive yet</span>
        <span className="text-5xl mx-auto mt-5">
          <BiArchiveIn />
        </span>
      </div>
    );
  } else {
    return (
      <div className=" flex flex-col gap-1">
        {archiveApplications.map((application) => {
          return (
            <ArchiveItem
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
    );
  }
}
export default Archive;
