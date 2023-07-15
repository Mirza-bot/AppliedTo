import { AiOutlineCloseCircle } from "react-icons/ai";

interface Props {
  noteContent: string;
  date: string;
  inPlace: number;
  onDelete: (index: number) => void;
}

function Note(props: Props) {
  return (
    <div className="flex flex-col border-darkgrey  border-2 rounded drop-shadow-slight">
      <div className="flex flex-row justify-between dark:bg-darkSecondary bg-darkgrey text-white dark:text-lightgrey px-0.5 ">
        <span className="ml-1">{props.inPlace + 1}</span>
        <span>{props.date}</span>
        <button
          className="text-2xl mb-1"
          onClick={() => props.onDelete(props.inPlace)}
        >
          <AiOutlineCloseCircle />
        </button>
      </div>
      <div className="p-3 text-justify bg-white dark:bg-darkPrimary">
        {props.noteContent}
      </div>
    </div>
  );
}
export default Note;
