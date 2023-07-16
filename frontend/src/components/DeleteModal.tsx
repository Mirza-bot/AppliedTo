import { motion } from "framer-motion";

interface Props {
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteModal = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white dark:bg-darkgrey w-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4 dark:text-lightgrey">
          Are you sure you want to delete this application?
        </h2>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-white bg-red rounded-lg mr-2"
            onClick={props.onDelete}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 text-lightgrey bg-darkgrey dark:bg-darkBg rounded-lg"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DeleteModal;
