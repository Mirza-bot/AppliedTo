import { useEffect } from "react";
import { useStatusStore } from "../../features/store/status";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

function SuccessNotification() {
  const state = useStatusStore((state) => state);
  const resetStatus = useStatusStore((state) => state.resetStatus);

  useEffect(() => {
    if (state.isSuccess) {
      toast.success(state.message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    resetStatus();
  }, [state.isSuccess, state.message, resetStatus]);

  return <ToastContainer />;
}

export default SuccessNotification;
