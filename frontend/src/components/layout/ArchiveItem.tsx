import { Application } from "../../../../shared/types";
import { AiFillStar, AiOutlineRollback } from "react-icons/ai";
import { format, parseISO } from "date-fns";
import ListItemButton from "./ListItemButton";
import { useApplicationStore } from "../../../features/store/applications";
import { useNavigate } from "react-router-dom";

function ArchiveItem(props: Application) {
  const navigate = useNavigate();
  const { editApplication, setActiveApplication } = useApplicationStore(
    (state) => state
  );

  function formatDate(dateString: string) {
    const date = parseISO(dateString);
    const formattedDate = format(date, "dd.MM.yyyy");
    return formattedDate;
  }

  const editStatus = (status: string) => {
    const updatedApplication = {
      ...props,
      status: status,
    };
    editApplication(updatedApplication);
  };

  return (
    <div className="flex justify-between w-screen bg-white dark:bg-darkSecondary dark:text-lightgrey">
      <div
        onClick={() => {
          setActiveApplication(props), navigate("/application");
        }}
        className="flex-col flex justify-between py-2 pl-2 overflow-hidden sm:px-5"
      >
        <span className="text-lg font-medium">{props.jobTitle}</span>
        <span className="text-lg font-semibold">{props.companyName}</span>
        <span className="text-sm font-light overflow-hidden">
          {props.appliedOver}
        </span>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col text-right justify-between py-2 px-2">
          <span className="text-sm font-light">
            {formatDate(props.createdAt as string)}
          </span>
          <span className="text-yellow flex justify-end text-2xl drop-shadow-slight">
            {props.isFavorite ? <AiFillStar /> : ""}
          </span>
          <span className="text-sm">{props.status}</span>
        </div>
        <ListItemButton
          icon={<AiOutlineRollback />}
          click={() => editStatus("Applied")}
          addClass="dark:bg-darkPrimary bg-secondary  p-3 w-12"
        />
      </div>
    </div>
  );
}
export default ArchiveItem;
