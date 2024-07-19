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
import Mission from './Pages/AboutUs/Mission';
import OurFleet from './Pages/AboutUs/OurFleet';
import OurCompany from './Pages/AboutUs/OurCompany';
import OurResponsibility from './Pages/AboutUs/OurResponsibility';
import ChairMan from './Pages/AboutUs/ChairMan';
import Manage_Offer from './Pages/Employee/Components/Manage_Offer';
import Manage_flights from './Pages/Employee/Components/Manage_flights';
import Answer_Questions from './Pages/Employee/Components/Answer_Questions';
import View_history from './Pages/Employee/Components/View_history';
import Visa_information from './Pages/Employee/Components/Visa_information';
import Reservation from './Pages/Employee/Components/Reservation';
import Admin from './Pages/Admin/Admin';
import Manage_employees from './Pages/Admin/Components/Manage_employees';
import Manage_permissions from './Pages/Admin/Components/Manage_permissions';
import ProfilePage from './Pages/Profile/ProfilePage';

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
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="verify" element={<Verify_email/>}/>

                  {/* about page nested route */}
                    <Route path="about-us">
                    <Route index element={<AboutUs />} />
                    <Route path="our-mission" element={<Mission />} />
                    <Route path="our-fleet" element={<OurFleet />} />
                    <Route path="our-company" element={<OurCompany />} />
                    <Route path="our-responsibility" element={<OurResponsibility />} />
                    <Route path="ceos-letter" element={<ChairMan />}/>
                    </Route>

                  {/* employee page nested route */}

                    <Route path="employee" >
                    <Route index element={<Employee/>}/>
                    <Route path="manage-offers" element={<Manage_Offer/>}/>
                    <Route path="reservation" element={<Reservation/>}/>
                    <Route path="manage-flights" element={<Manage_flights/>}/>
                    <Route path="answer-questions" element={<Answer_Questions/>}/>
                    <Route path="view-history" element={<View_history/>}/>
                    <Route path="visa-information" element={<Visa_information/>}/>
                    </Route>

                     {/* admin page nested route */}

                    <Route path="admin">
                    <Route index element={<Admin/>}/>
                    <Route path='manage-employees' element={<Manage_employees/>}/>
                    <Route path='manage-permissions' element={<Manage_permissions/>}/>
                    </Route>

                    <Route path="profile" element={<ProfilePage />} />

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
