interface Props {
  onCancel: () => void;
  onDelete: () => void;
}

const Modal = (props: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white w-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">
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
            className="px-4 py-2 text-lightgrey bg-darkgrey rounded-lg"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
