import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/User/HomePage/HomePage";

//===============================================================

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={"/users/HomePage"} element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
