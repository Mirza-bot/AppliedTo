import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="-translate-y-10">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
