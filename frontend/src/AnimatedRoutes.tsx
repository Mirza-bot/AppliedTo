import Welcome from "./pages/Welcome";
import AuthPage from "./pages/AuthPage";
import { Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" Component={Welcome} />
        <Route path="/login" Component={AuthPage} />
      </Routes>
    </AnimatePresence>
  );
}
export default AnimatedRoutes;
