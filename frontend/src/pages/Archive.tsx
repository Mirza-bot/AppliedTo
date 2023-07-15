import { useApplicationStore } from "../../features/store/applications";
import ArchiveItem from "../components/layout/ArchiveItem";

function Archive() {
  const applications = useApplicationStore((state) => state.applications);

  return (
    <div className=" flex flex-col gap-1">
      {applications.map((application) => {
        if (application.status === "Archived") {
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
        }
      })}
    </div>
  );
}
export default Archive;
