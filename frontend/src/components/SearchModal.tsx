import { motion } from "framer-motion";
import CustomInput from "./layout/CustomInput";
import { useState } from "react";

interface Props {
  onCancel: () => void;
  onSearch: (value: string) => void;
}
function SearchModal(props: Props) {
  const [searchValue, setSearchValue] = useState<string>("");

  const searchAndClose = () => {
    props.onSearch(searchValue);
    props.onCancel();
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
        <h2 className="text-lg font-bold mb-2">Search for:</h2>
        <CustomInput
          event={setSearchValue}
          label=""
          type="text"
          id="searchValue"
        />
        <div className="flex justify-evenly mt-1">
          <button
            className="px-4 py-2 text-lightgrey dark:text-black bg-primary rounded-lg"
            onClick={searchAndClose}
          >
            Search
          </button>
          <button
            className="px-4 py-2 text-lightgrey bg-darkgrey rounded-lg"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SearchModal;
