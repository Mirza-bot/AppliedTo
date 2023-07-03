import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AnimatedRoutes from "./AnimatedRoutes";
import ErrorNotification from "./components/ErrorNotification";
import useStatusStore from "../features/store/status";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const status = useStatusStore();

  return (
    <Router>
      <ErrorNotification />
      <Navbar />
      <div className="-translate-y-10">
        {status.isLoading ? <LoadingSpinner /> : <AnimatedRoutes />}
      </div>
    </Router>
  );
}

export default App;
