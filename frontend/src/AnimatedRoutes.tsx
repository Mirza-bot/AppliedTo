import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

/**
 * Pages
 */
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import ApplicationList from "./pages/ApplicationList";
import DocumentsView from "./pages/DocumentView";
import ApplicationEditor from "./pages/ApplicationEditor";
import ApplicationView from "./pages/ApplicationView";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={AuthPage} />
        <Route path="/applicationList" Component={ApplicationList} />
        <Route path="/application/new" Component={ApplicationEditor} />
        <Route path="/application" Component={ApplicationView} />
        <Route path="/documents" Component={DocumentsView} />
      </Routes>
    </AnimatePresence>
  );
}
export default AnimatedRoutes;
