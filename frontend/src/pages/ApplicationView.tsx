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

  interface Note {
    note: string;
    date: string;
  }

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
    if (!application) {
      navigate("/applicationList");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [application]);

  if (application) {
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
        <div className=" w-full absolute left-0 mt-5">
          <div className="bg-secondary flex w-full justify-between pr-5 py-2 ">
            <h3 className="text-xl ml-5 font-semibold ">Notes</h3>
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
