import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Layouts from "./Components/Layouts/Layouts";
import Register from "./Pages/Forms/Register/Register";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
