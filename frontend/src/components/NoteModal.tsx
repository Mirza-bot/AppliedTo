import { motion } from "framer-motion";
import CustomInput from "./layout/CustomInput";
import { useState } from "react";
import { Application } from "../../../shared/types";

interface Props {
  application: Application;
  onCancel: () => void;
  onSave: (note: string, date: string) => void;
}

function NoteModal(props: Props) {
  const [note, setNote] = useState<string>("");

  const submit = () => {
    if (note !== "") {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const year = currentDate.getFullYear().toString();

      const formattedDate = `${day}.${month}.${year}`;
      props.onSave(note, formattedDate);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white dark:bg-darkPrimary dark:text-lightgrey w-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-2">Note</h2>
        <CustomInput
          event={setNote}
          label=""
          type="text"
          textarea={true}
          id="searchValue"
          value={note}
        />
        <div className="flex justify-evenly mt-1">
          <button
            className="px-4 py-2 text-lightgrey bg-primary rounded-lg"
            onClick={() => submit()}
          >
            Save
          </button>
          <button
            className="px-4 py-2 text-lightgrey bg-darkgrey rounded-lg"
            onClick={() => props.onCancel()}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
export default NoteModal;
