import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { AiFillStar, AiOutlineStar, AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { TiArrowSync } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { Application } from "../../../../shared/types";
import { useApplicationStore } from "../../../features/store/applications";
import { format, parseISO } from "date-fns";
import DeleteModal from "../DeleteModal";

function ApplicationListItem(props: Application) {
  const [favorite, setFavorite] = useState<boolean>(false);

  //Navigation
  const navigate = useNavigate();

  const redirect = () => {
    if (tilePosition !== 1) {
      setTilePosition(1);
    } else if (tilePosition === 1 && modalOpen === false) {
      setActiveApplication(props);
      navigate("/application");
    }
  };

  // Modal for "Delete" permission
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setFavorite(props.isFavorite as boolean);
  }, [props.isFavorite]);

  // Date Formatting
  function formatDate(dateString: string) {
    const date = parseISO(dateString);
    const formattedDate = format(date, "dd.MM.yyyy");
    return formattedDate;
  }

  //State mutations
  const setActiveApplication = useApplicationStore(
    (state) => state.setActiveApplication
  );
  const deleteApplication = useApplicationStore(
    (state) => state.deleteApplication
  );
  const editApplication = useApplicationStore((state) => state.editApplication);

  const editFavorite = (isFavorite: boolean) => {
    const updatedApplication = {
      ...props,
      isFavorite: isFavorite,
    };
    editApplication(updatedApplication);
  };

  /**
   * This Component checks if the ListItem gets moved via touch gesture to the left
   * or to the right. Depending on the direction it sets the transitionX to show the
   * buttons that overflow the viewport width.
   * The directions are represented with numbers. 0 === Left; 1 === Middle(Idle); 2 === Right
   */
  const [swipeDirection, setSwipeDirection] = useState<number | null>(null);
  const [tilePosition, setTilePosition] = useState<number>(1);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    setSwipeDirection(touch.clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (swipeDirection === null) return;

    const touch = event.touches[0];
    const difference = swipeDirection - touch.clientX;

    if (difference > 0) {
      // Swiping left
      if (difference >= 80) {
        if (tilePosition > 0) {
          setTilePosition(tilePosition - 1);
          setSwipeDirection(null);
        }
      }
    } else {
      // Swiping right
      if (Math.abs(difference) >= 80) {
        if (tilePosition < 2) {
          setTilePosition(tilePosition + 1);
          setSwipeDirection(null);
        }
      }
    }
  };

  const displayPosition = () => {
    if (tilePosition === 0) return "-60vw";
    else if (tilePosition === 1) return "-30vw";
    else if (tilePosition === 2) return "0";
    else setTilePosition(1);
  };

  const handleTouchEnd = () => {
    setSwipeDirection(null);
  };

  return (
    <div
      className={` h-24 bg-white flex-row flex transition-all ease-in-out ${
        swipeDirection !== null ? "swipe-active" : ""
      } `}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={redirect}
      style={{ width: "160vw", transform: `translateX(${displayPosition()})` }}
    >
      {modalOpen &&
        ReactDOM.createPortal(
          <DeleteModal
            onDelete={() => deleteApplication(props._id as string)}
            onCancel={() => setModalOpen(false)}
          />,
          document.getElementById("root") as Element
        )}
      <div className="flex flex-row w-4/12 my-4 ml-2 mr-1 gap-3 drop-shadow-slight">
        <button className="bg-grey w-1/2 overflow-hidden rounded-sm text-4xl text-white flex justify-center items-center">
          <span className="drop-shadow-slight">
            <AiOutlineEdit />
          </span>
        </button>
        <button
          onClick={() => {
            editFavorite(!favorite);
          }}
          className={`bg-yellow ${
            favorite && "bg-opacity-50"
          } w-1/2 overflow-hidden rounded-sm text-4xl text-white flex justify-center items-center`}
        >
          <span className="drop-shadow-slight">
            <AiOutlineStar />
          </span>
        </button>
      </div>

      <div
        className="flex justify-between transition-all ease-in-out"
        style={{ width: "200vw" }}
      >
        <div className="flex-col flex justify-between py-2 pl-2 overflow-hidden sm:px-5">
          <span className="text-lg font-medium">{props.jobTitle}</span>
          <span className="text-lg font-semibold">{props.companyName}</span>
          <span className="text-sm font-light">{props.appliedOver}</span>
        </div>
        <div className="flex flex-col text-right justify-between py-2 pr-2">
          <span className="text-sm font-light">
            {formatDate(props.createdAt as string)}
          </span>
          <span className="text-yellow flex justify-end text-2xl drop-shadow-slight">
            {favorite ? <AiFillStar /> : ""}
          </span>
          <span className="text-sm">{props.status}</span>
        </div>
      </div>
      <div className="flex flex-row w-4/12 my-4 ml-1 mr-2 gap-3 drop-shadow-slight">
        <button
          onClick={() => {
            setModalOpen(true);
          }}
          className="bg-red w-1/2 overflow-hidden rounded-sm text-4xl text-white flex justify-center items-center"
        >
          <span className="drop-shadow-slight">
            <BiTrash />
          </span>
        </button>
        <button className="bg-primary  w-1/2 overflow-hidden rounded-sm text-4xl text-white flex justify-center items-center">
          <span className="drop-shadow-slight">
            <TiArrowSync />
          </span>
        </button>
      </div>
    </div>
  );
}
export default ApplicationListItem;
