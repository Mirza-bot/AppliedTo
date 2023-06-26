import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={Login}></Route>
      </Routes>
    </Router>
  );
}

export default App;
