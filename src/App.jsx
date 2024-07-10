import React from 'react';

import { BrowserRouter as  Router, Routes,Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Layouts from './Components/Layouts/Layouts';
import Error_page from './Pages/Error_page/Error_page';
import Verify_email from './Pages/Verify-email/Verify_email';
import Register from "./Pages/Forms/Register/Register";
import Login from './Pages/Forms/Login/Login';
import AboutUs from './Pages/AboutUs/AboutUs';

const App = () => {
  return (
    <div>
      <Router>
             <Routes>
                    <Route path="/" element={<Layouts />}>
                    <Route index element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about-us" element={<AboutUs />} />




                    </Route>
                    <Route path="/*" element={<Error_page/>}/>
                    <Route path="/v" element={<Verify_email/>}/>

            </Routes>

      
      </Router>
    </div>
  );
};

export default App;
