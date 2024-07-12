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
import Employee from './Pages/Employee/Employee';

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
                    <Route path="/v" element={<Verify_email/>}/>

                    <Route path="/about-us" element={<AboutUs />} />


                    <Route path="employee" element={<Employee/>} >
                            
                    </Route>

                    </Route>
                    <Route path="/*" element={<Error_page/>}/>

            </Routes>

      
      </Router>
      <div id='go_up' className='hidden' onClick={()=>window.scrollTo(0,0)}>
      <Go_up />
      </div>
      
    </div>
  );
};

export default App;
