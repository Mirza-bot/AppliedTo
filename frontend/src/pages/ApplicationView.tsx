import { useApplicationStore } from "../../features/store/applications";
import { format, parseISO } from "date-fns";
import { AiFillStar } from "react-icons/ai";

function ApplicationView() {
  // Date Formatting
  function formatDate(dateString: string) {
    const date = parseISO(dateString);
    const formattedDate = format(date, "dd.MM.yyyy");
    return formattedDate;
  }

  const application = useApplicationStore((state) => state.activeApplication);

  return (
    <div className="p-5 mt-1 w-screen overflow-hidden">
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium pt-5">{application?.jobTitle}</h1>
        <div className="flex flex-col text-right">
          <span className="text-sm mb-1">
            {formatDate(application?.createdAt as string)}
          </span>
          <div>
            <span className="text-yellow text-2xl drop-shadow-slight float-right">
              {application?.isFavorite && <AiFillStar />}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl mt-2 font-semibold">
          {application?.companyName}
        </h1>
        <div className="mt-3 bg-white rounded-sm p-2">
          <span className=" font-medium">Description</span>
          <p className="mt-3">{application?.jobDescription}</p>
        </div>
      </div>
    </div>
  );
}
export default ApplicationView;
