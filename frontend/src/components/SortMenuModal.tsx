import { motion } from "framer-motion";
import { useApplicationStore } from "../../features/store/applications";

interface Props {
  onCancel: () => void;
  onSort: (value: string) => void;
}

const SortMenuModal = (props: Props) => {
  const sortByValue = useApplicationStore((state) => state.sortByValue);

  const sortAndClose = (value: string) => {
    props.onSort(value);
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
      <div className="relative bg-white w-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Sort list by:</h2>
        <div className="outline-2 outline outline-grey rounded mb-5">
          <div className="flex flex-col gap-0.5 bg-grey text-center">
            <button
              onClick={() => sortAndClose("date")}
              className={`w-full p-3 text-xl ${
                sortByValue === "date" ? "bg-primary text-white" : "bg-white"
              }`}
            >
              Date
            </button>
            <button
              onClick={() => sortAndClose("company")}
              className={`w-full p-3 text-xl ${
                sortByValue === "company" ? "bg-primary text-white" : "bg-white"
              }`}
            >
              Company
            </button>
            <button
              onClick={() => sortAndClose("position")}
              className={`w-full p-3 text-xl ${
                sortByValue === "position"
                  ? "bg-primary text-white"
                  : "bg-white"
              }`}
            >
              Position
            </button>
            <button
              onClick={() => sortAndClose("appliedOver")}
              className={`w-full p-3 text-xl ${
                sortByValue === "appliedOver"
                  ? "bg-primary text-white"
                  : "bg-white"
              }`}
            >
              Applied Over
            </button>
            <button
              onClick={() => sortAndClose("status")}
              className={`w-full p-3 text-xl ${
                sortByValue === "status" ? "bg-primary text-white" : "bg-white"
              }`}
            >
              Status
            </button>
            <button
              onClick={() => sortAndClose("isFavorite")}
              className={`w-full p-3 text-xl ${
                sortByValue === "isFavorite"
                  ? "bg-primary text-white"
                  : "bg-white"
              }`}
            >
              Favorite
            </button>
          </div>
        </div>
        <div className="flex justify-center">
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
};

export default SortMenuModal;
