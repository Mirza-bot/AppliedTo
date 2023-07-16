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
import ListItemButton from "./ListItemButton";
import StatusModal from "../StatusModal";

function ApplicationListItem(props: Application) {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [componentWidth, setComponentWidth] = useState<number>(0);

  //Navigation
  const navigate = useNavigate();

  //Calculate width of component
  const calcWidth = (): number => {
    const component = document.getElementById(`${props._id}`);
    const buttonContainers = component?.querySelectorAll(".button_container");
    let containersWidth = 0;
    buttonContainers?.forEach((container) => {
      const containerElement = container as HTMLElement;
      containersWidth = containersWidth + containerElement.offsetWidth;
    });
    return containersWidth + 26.5;
  };

  const redirect = () => {
    if (tilePosition !== 1) {
      setTilePosition(1);
    } else if (tilePosition === 1 && deleteModalOpen === false) {
      setActiveApplication(props);
      navigate("/application");
    }
  };

  // #####################################
  // ############ Modals #################
  // #####################################
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  useEffect(() => {
    setFavorite(props.isFavorite as boolean);
    setComponentWidth(calcWidth() + window.innerWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isFavorite]);

  // Date Formatting
  function formatDate(dateString: string) {
    const date = parseISO(dateString);
    const formattedDate = format(date, "dd.MM.yyyy");
    return formattedDate;
  }

  //State mutations

  const { setActiveApplication, deleteApplication, editApplication } =
    useApplicationStore((state) => state);

  const editFavorite = (isFavorite: boolean) => {
    const updatedApplication = {
      ...props,
      isFavorite: isFavorite,
    };
    editApplication(updatedApplication);
  };

  const editStatus = (status: string) => {
    const updatedApplication = {
      ...props,
      status: status,
    };
    editApplication(updatedApplication);
    setTilePosition(1);
  };

  /**
   * This Component checks if the ListItem gets moved via touch gesture to the left
   * or to the right. Depending on the direction it sets the transitionX to show the
   * buttons that overflow the viewport width.
   * The directions are represented with numbers. 0 === Left; 1 === Middle(Idle); 2 === Right
   */
  const [swipeDirection, setSwipeDirection] = useState<number | null>(null);
  const [tilePosition, setTilePosition] = useState<number>(1);
  const [swipeActive, setSwipeActive] = useState<boolean>(false);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setSwipeActive(true);
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

  const handleTouchEnd = () => {
    setSwipeActive(false);
    setSwipeDirection(null);
  };

  const displayPosition = () => {
    if (tilePosition === 0) return `-${calcWidth()}px`;
    else if (tilePosition === 1) return `-${calcWidth() / 2}px`;
    else if (tilePosition === 2) return "0";
    else setTilePosition(1);
  };

  if (window.innerWidth < 1024) {
    return (
      <div
        id={props._id}
        className={`application_list_item h-24 bg-white dark:bg-darkSecondary flex-row flex ${
          swipeActive && "transition-transform ease-out duration-300"
        } `}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          minWidth: "200vw",
          width: componentWidth,
          transform: `translateX(${displayPosition()})`,
        }}
      >
        {deleteModalOpen &&
          ReactDOM.createPortal(
            <DeleteModal
              onDelete={() => deleteApplication(props._id as string)}
              onCancel={() => {
                setDeleteModalOpen(false);
                setTilePosition(1);
              }}
            />,
            document.getElementById("root") as Element
          )}
        <div className="button_container flex flex-row my-2 ml-2 mr-1 gap-2 drop-shadow-slight">
          <ListItemButton
            click={() => {
              setActiveApplication(props), navigate("/application/edit");
            }}
            icon={<AiOutlineEdit />}
            addClass="bg-grey"
          />
          <ListItemButton
            click={() => {
              editFavorite(!favorite);
            }}
            addClass="bg-yellow"
            icon={<AiOutlineStar />}
            active={favorite}
          />
        </div>

        <div
          className="flex justify-between w-screen dark:text-lightgrey"
          onClick={redirect}
        >
          <div className="flex-col flex justify-between py-2 pl-2 overflow-hidden sm:px-5">
            <span className="text-lg font-medium">{props.jobTitle}</span>
            <span className="text-lg font-semibold">{props.companyName}</span>
            <span className="text-sm font-light overflow-hidden ">
              {props.appliedOver}
            </span>
          </div>
          <div className="flex flex-col text-right justify-between py-2 px-2">
            <span className="text-sm font-light">
              {formatDate(props.createdAt as string)}
            </span>
            <span className="text-yellow flex justify-end text-2xl drop-shadow-slight">
              {favorite ? <AiFillStar /> : ""}
            </span>
            <span className="text-sm">{props.status}</span>
          </div>
        </div>
        <div className="button_container flex flex-row my-2 ml-2 mr-1 gap-2 drop-shadow-slight">
          <ListItemButton
            click={() => setDeleteModalOpen(true)}
            icon={<BiTrash />}
            addClass="bg-red"
          />
          {statusModalOpen &&
            ReactDOM.createPortal(
              <StatusModal
                onCancel={() => {
                  setStatusModalOpen(false);
                  setTilePosition(1);
                }}
                editStatus={editStatus}
                companyName={props.companyName}
                jobTitle={props.jobTitle}
                status={props.status}
                _id={props._id}
                jobDescription=""
              />,
              document.getElementById("root") as Element
            )}
          <ListItemButton
            icon={<TiArrowSync />}
            click={() => setStatusModalOpen(true)}
            addClass="bg-primary"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div
        id={props._id}
        className="p-4 bg-white dark:bg-darkSecondary dark:text-lightgrey flex justify-between hover:cursor-pointer application_list_item"
        onClick={() => setActiveApplication(props)}
      >
        <div className="flex flex-col">
          <h1 className="text-lg">{props.jobTitle}</h1>
          <h2>{props.companyName}</h2>
          <span className=" overflow-hidden w-36">{props.appliedOver}</span>
        </div>
        <div className="flex flex-col text-right">
          <span>{formatDate(props.createdAt as string)}</span>
          <span>{props.status}</span>

          <span
            className={`text-2xl max-w-max ml-auto ${
              props.isFavorite
                ? "text-yellow"
                : "text-white dark:text-darkSecondary"
            }`}
          >
            <AiFillStar />
          </span>
        </div>
      </div>
    );
  }
}
export default ApplicationListItem;
