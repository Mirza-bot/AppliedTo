import { useApplicationStore } from "../../features/store/applications";
import ReactDOM from "react-dom";
import { format, parseISO } from "date-fns";
import { AiFillStar, AiOutlinePlusCircle } from "react-icons/ai";
import Note from "../components/layout/Note";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NoteModal from "../components/NoteModal";
import { Application } from "../../../shared/types";

function ApplicationView() {
  const navigate = useNavigate();
  const [noteModalOpen, setNoteModalOpen] = useState<boolean>(false);
  const application = useApplicationStore((state) => state.activeApplication);
  const { setActiveApplication } = useApplicationStore((state) => state);

  // Date Formatting
  function formatDate(dateString: string) {
    const date = parseISO(dateString);
    const formattedDate = format(date, "dd.MM.yyyy");
    return formattedDate;
  }

  const editApplication = useApplicationStore((state) => state.editApplication);

  const saveNote = (note: string, date: string) => {
    const updatedApplication = {
      ...application,
      notes: [...(application?.notes || []), { note, date }],
    };
    editApplication(updatedApplication as Application);
    setActiveApplication(updatedApplication as Application);
    setNoteModalOpen(false);
  };

  const deleteNote = (index: number) => {
    const notes = application?.notes;
    const newNotesArray = notes?.filter((x) => notes.indexOf(x) !== index);
    const updatedApplication = {
      ...application,
      notes: newNotesArray,
    };
    editApplication(updatedApplication as Application);
    setActiveApplication(updatedApplication as Application);
    setNoteModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!application) {
      navigate("/applicationList");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [application]);

  if (!application) {
    return (
      <div className="text-3xl p-8 text-darkgrey dark:text-lightgrey">
        Choose an application from the list to see a preview.
      </div>
    );
  } else {
    return (
      <div className="p-5 mt-1 w-screen lg:w-full overflow-hidden lg:overflow-y-scroll lg:h-screen dark:text-lightgrey">
        <div className="flex w-full justify-between ">
          <div>
            <h1 className="text-2xl font-medium pt-5">
              {application?.jobTitle}
            </h1>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-sm mb-1">
              {formatDate(application?.createdAt as string)}
            </span>
            <span className="text-sm font-light ">{application.status}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl mt-2 font-semibold flex justify-between">
            {application?.companyName}
            <span className="text-yellow text-2xl drop-shadow-slight  ">
              {application?.isFavorite && <AiFillStar />}
            </span>
          </h1>
          <div className="mt-3 bg-white dark:bg-darkPrimary rounded-sm p-2 lg:overflow-y-auto lg:max-h-96">
            <span className=" font-medium">Description</span>
            <p className="mt-3">{application?.jobDescription}</p>
          </div>
        </div>
        <div className=" w-full lg:bg-white lg:dark:bg-darkPrimary  lg:block lg:rounded-sm left-0 mt-5">
          <div className="bg-secondary  dark:bg-darkAccent flex w-full justify-between pr-5 py-2 lg:rounded-t-sm">
            <h3 className="text-xl ml-5 font-semibold  ">Notes</h3>
            <button
              onClick={() => setNoteModalOpen(true)}
              className="  text-2xl p-0.5 rounded-sm"
            >
              <AiOutlinePlusCircle />
            </button>
            {noteModalOpen &&
              ReactDOM.createPortal(
                <NoteModal
                  onSave={saveNote}
                  application={application as Application}
                  onCancel={() => setNoteModalOpen(false)}
                />,
                document.getElementById("root") as Element
              )}
          </div>
          <div className="flex flex-col m-5 gap-6">
            {application.notes?.map((note, index) => {
              return (
                <Note
                  key={index}
                  inPlace={index}
                  date={note.date}
                  noteContent={note.note}
                  onDelete={deleteNote}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationView;
