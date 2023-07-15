import { motion } from "framer-motion";
import { Application } from "../../../shared/types";
import { BiArchiveIn } from "react-icons/bi";

interface Props extends Application {
  onCancel: () => void;
  editStatus: (status: string) => void;
}

function StatusModal(props: Props) {
  const submit = (status: string) => {
    props.editStatus(status);
    props.onCancel();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="fixed inset-0 flex items-center justify-center z-50 dark:text-lightgrey"
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white dark:bg-darkSecondary w-80 p-6 rounded-lg shadow-lg">
        <div className="flex gap-3">
          <h2 className=" font-semibold mb-4">
            Set status for {props.jobTitle} at {props.companyName}
          </h2>
          <button
            className="bg-primary p-2 text-sm rounded text-white font-semibold h-fit flex gap-2"
            onClick={() => submit("Archived")}
          >
            <span className="text-xl">
              <BiArchiveIn />
            </span>
            Archive
          </button>
        </div>
        <div className="outline-2 outline outline-grey rounded mb-5">
          <div className="flex flex-col gap-0.5 bg-grey text-center">
            <button
              className="p-2 bg-white dark:bg-darkPrimary"
              onClick={() => submit("Applied")}
            >
              Applied
            </button>
            <button
              className="p-2 bg-white dark:bg-darkPrimary"
              onClick={() => submit("Interviewing")}
            >
              Interviewing
            </button>
            <button
              className="p-2 bg-white dark:bg-darkPrimary"
              onClick={() => submit("Ghosted")}
            >
              Ghosted
            </button>
            <button
              className="p-2 bg-white dark:bg-darkPrimary"
              onClick={() => submit("Rejected")}
            >
              Rejected
            </button>
            <button
              className="p-2 bg-white dark:bg-darkPrimary"
              onClick={() => submit("Accepted")}
            >
              Accepted
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 text-lightgrey bg-darkgrey dark:bg-darkAccent rounded-lg"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
export default StatusModal;
