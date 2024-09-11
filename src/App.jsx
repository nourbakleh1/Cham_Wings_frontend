import React, { useEffect, useRef } from 'react';

import { BrowserRouter as  Router, Routes,Route, Navigate } from 'react-router-dom';
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
import Manage_flights from './Pages/Employee/Manage_flights/Manage_flights';
import Answer_Questions from './Pages/Employee/Components/Answer_Questions';
import View_history from './Pages/Employee/Components/View_history';
import Visa_information from './Pages/Employee/Components/Visa_information';
import Reservation from './Pages/Employee/Components/Reservation';
import Admin from './Pages/Admin/Admin';
import Manage_employees from './Pages/Admin/Components/Manage_employees/Manage_employees';
import Manage_permissions from './Pages/Admin/Components/Manage_employees/Manage_permissions';
import Layouts_dashboard from './Components/Layouts/Layouts_dashboard';
import Layouts_admin_dash from './Components/Layouts/Layouts_admin_dash';
import FlightList from './Pages/Flight/FlightList';
import ContactUs from './Pages/ContactUs/ContactUs';
import Chatbot_user from './Components/Chatbot_user/Chatbot_user'; 
import Reservation_seats from './Pages/Reservation_seats/Reservation_seats';
import { ToastContainer } from 'react-toastify';
import Chatbot_emp from './Pages/Employee/Components/Chatbot/Chatbot_emp';
import Companions from './Pages/Companions/Companions';
import Forgot_password from './Pages/Reset_Password/Forgot_password';
import Reset_password from './Pages/Reset_Password/Reset_password';
import { useSelector } from 'react-redux';
import Verify_email_pass from './Pages/Verify-email/Verify_email_pass';
import ProfilePage from './Pages/Profile/profile';
import Profile from './Pages/Profile/Employee/profile';
import QuestionsPage from './Pages/QandA/QuestionsPage';

const App = () => {
  const ref=useRef(null);
  const {user}=useSelector((state)=>state.auth)
  const role = user?.data?.user?.employee?.roles[0]?.role_id;
 
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
      <ToastContainer theme="colored" position="top-center"/>
             <Routes>
                    <Route path="/" element={role == undefined ?<Layouts />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}>
                    <Route index element={role == undefined ?<Home/>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>

                      {/* auth routes */}
                    <Route path="register" element={!user ? <Register />: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>} />
                    <Route path="login" element={!user ? <Login />: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>} />
                    <Route path="verify-email/:email" element={!user ? <Verify_email/>: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>}/>
                    <Route path="verify-email_pass/:email" element={!user ? <Verify_email_pass/>: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>}/>
                    <Route path="forgot_password" element={!user ? <Forgot_password/>: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>}/>
                    <Route path="reset_password" element={!user ? <Reset_password/>: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>}/>


                    
                    <Route path="profile" element={role == undefined ?<ProfilePage/>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>
                    <Route path="questions" element={role == undefined ?<QuestionsPage/>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>

                    {/* passenger page */}
                    <Route path="flight" element={role == undefined ? <FlightList />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="contact-us" element={role == undefined ? <ContactUs />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="reservation" element={role == undefined ? <Companions />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="reservation_seats" element={role == undefined?<Reservation_seats />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="verifyEmail/:email" element={!user ? <verfiyEmail />: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>}/>



                  {/* about page nested route */}
                    <Route path="about-us">
                    <Route index element={role == undefined?<AboutUs />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="our-mission" element={role == undefined?<Mission />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="our-fleet" element={role == undefined?<OurFleet />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="our-company" element={role == undefined?<OurCompany />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="our-responsibility" element={role == undefined?<OurResponsibility />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="ceos-letter" element={role == undefined?<ChairMan />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>
                    </Route>


                    </Route>

                     {/* employee page nested route */}
                    <Route path='/dashboard/employee' element={role != 4 && role != undefined ?<Layouts_dashboard/> : <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}>

                    <Route index element={role != 4 && role != undefined ?<Employee/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="manage-offers" element={role != 4 && role != undefined ?<Manage_Offer/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="chatbot_emp" element={role != 4 && role != undefined ?<Chatbot_emp/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="reservation" element={role != 4 && role != undefined ?<Reservation/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="manage-flights" element={role != 4 && role != undefined ?<Manage_flights/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="answer-questions" element={role != 4 && role != undefined ?<Answer_Questions/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="view-history" element={role != 4 && role != undefined ?<View_history/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="visa-information" element={role != 4 && role != undefined ?<Visa_information/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="profile" element={role != 4 && role != undefined ?<Profile/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="questions" element={role != 4 && role != undefined ? <QuestionsPage/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    
                    </Route>

                    {/* admin page nested route */}
                    <Route path="/admin_dashboard" element={role == 4 ?<Layouts_admin_dash/>:<Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}>     

                    <Route index element={role == 4 ? <Admin/>:<Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                     <Route path='manage-employees' element={role == 4 ? <Manage_employees/>: <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                    <Route path='manage-permissions' element={role == 4 ? <Manage_permissions/>: <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                    <Route path="profile" element={role == 4 ? <Profile/>: <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                    <Route path="questions" element={role == 4 ? <QuestionsPage/>: <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>

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