import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AnimatedRoutes from "./AnimatedRoutes";
import ErrorNotification from "./components/ErrorNotification";
import useStatusStore from "../features/store/status";

function App() {
  const status = useStatusStore();

  return (
    <Router>
      <ErrorNotification />
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
