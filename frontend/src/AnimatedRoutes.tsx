import Welcome from "./pages/Welcome";
import AuthPage from "./pages/AuthPage";
import ApplicationList from "./pages/ApplicationList";
import { Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" Component={Welcome} />
        <Route path="/login" Component={AuthPage} />
        <Route path="/applications" Component={ApplicationList} />
      </Routes>
    </AnimatePresence>
  );
}
export default AnimatedRoutes;
