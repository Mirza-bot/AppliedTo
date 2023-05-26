import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" Component={Login}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
