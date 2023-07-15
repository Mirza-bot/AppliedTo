import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

/**
 * Pages
 */
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import ApplicationList from "./pages/ApplicationList";
import DocumentsView from "./pages/DocumentView";
import ApplicationEditor from "./pages/ApplicationEditor";
import ApplicationView from "./pages/ApplicationView";
import Settings from "./pages/Settings";
import useSettingsStore from "../features/store/settings";

function AnimatedRoutes() {
  const location = useLocation();
  const isDarkMode = useSettingsStore().darkMode;

  const toggleDarkMode = () => {
    const root = document.documentElement;
    const themeColorMeta = document.getElementById("theme-color-meta");

    if (isDarkMode) {
      root.classList.add("dark");
      themeColorMeta?.setAttribute("content", "#043022");
    } else {
      root.classList.remove("dark");
      themeColorMeta?.setAttribute("content", "#10B981");
    }
  };

  useEffect(() => {
    toggleDarkMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={AuthPage} />
        <Route path="/applicationList" Component={ApplicationList} />
        <Route path="/application/new" Component={ApplicationEditor} />
        <Route path="/application/edit" Component={ApplicationEditor} />
        <Route path="/application" Component={ApplicationView} />
        <Route path="/settings" Component={Settings} />
        <Route path="/documents" Component={DocumentsView} />
      </Routes>
    </AnimatePresence>
  );
}
export default AnimatedRoutes;
