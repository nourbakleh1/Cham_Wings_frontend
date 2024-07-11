import React, { useEffect, useRef } from 'react';

import { BrowserRouter as  Router, Routes,Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Layouts from './Components/Layouts/Layouts';
import Error_page from './Pages/Error_page/Error_page';
import Verify_email from './Pages/Verify-email/Verify_email';
import Go_up from './Components/Go_up/Go_up';
import Register from "./Pages/Forms/Register/Register";
import Login from './Pages/Forms/Login/Login';
import AboutUs from './Pages/AboutUs/AboutUs';
import Mission from './Pages/AboutUs/Mission';
import OurFleet from './Pages/AboutUs/OurFleet';
import OurCompany from './Pages/AboutUs/OurCompany';
import OurResponsibility from './Pages/AboutUs/OurResponsibility';
import ChairMan from './Pages/AboutUs/ChairMan';

const App = () => {
  const ref=useRef(null);

  useEffect(()=>{
    window.addEventListener("scroll",()=>{
      if(window.scrollY > 700){
        document.getElementById("go_up").classList.remove("hidden");
      }
      else{
        document.getElementById("go_up").classList.add("hidden");
      }
    })
  },[]);
  return (
    <div>
      <Router>
             <Routes>
                    <Route path="/" element={<Layouts />}>
                    <Route index element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/our-mission" element={<Mission />} />
                    <Route path="/our-fleet" element={<OurFleet />} />
                    <Route path="/our-company" element={<OurCompany />} />
                    <Route path="/our-responsibility" element={<OurResponsibility />} />
                    <Route path="/ceos-letter" element={<ChairMan />} />




                    </Route>
                    <Route path="/*" element={<Error_page/>}/>
                    <Route path="/v" element={<Verify_email/>}/>

            </Routes>

      
      </Router>
      <div id='go_up' className='hidden' onClick={()=>window.scrollTo(0,0)}>
      <Go_up />
      </div>
      
    </div>
  );
};

export default App;
