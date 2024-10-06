import React, { Suspense, useEffect, useRef, useState } from 'react';

import { BrowserRouter as  Router, Routes,Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Layouts from './Components/Layouts/Layouts';
import Error_page from './Pages/Error_page/Error_page';
import Verify_email from './Pages/Verify-email/Verify_email';
import Go_up from './Components/Go_up/Go_up';
import Register from "./Pages/Forms/Register/Register";
import Login from './Pages/Forms/Login/Login';
const AboutUs =React.lazy(()=>import("./Pages/AboutUs/AboutUs"));
const Employee =React.lazy(()=>import("./Pages/Employee/Employee"));

import Mission from './Pages/AboutUs/Mission';
import OurFleet from './Pages/AboutUs/OurFleet';
import OurCompany from './Pages/AboutUs/OurCompany';
import OurResponsibility from './Pages/AboutUs/OurResponsibility';
import ChairMan from './Pages/AboutUs/ChairMan';
import Manage_Offer from './Pages/Employee/Components/Manage_offers/Manage_Offer';
import Manage_flights from './Pages/Employee/Manage_flights/Manage_flights';
const View_history =React.lazy(()=>import("./Pages/Admin/Components/View_history"));

const Admin =React.lazy(()=>import("./Pages/Admin/Admin"));
const Manage_employees =React.lazy(()=>import("./Pages/Admin/Components/Manage_employees/Manage_employees"));
const Manage_permissions =React.lazy(()=>import("./Pages/Admin/Components/Manage_employees/Manage_permissions"));

import Layouts_dashboard from './Components/Layouts/Layouts_dashboard';
import Layouts_admin_dash from './Components/Layouts/Layouts_admin_dash';
import FlightList from './Pages/Flight/FlightList';
const ContactUs =React.lazy(()=>import("./Pages/ContactUs/ContactUs"));

import Reservation_seats from './Pages/Reservation_seats/Reservation_seats';
import { ToastContainer } from 'react-toastify';
import Chatbot_emp from './Pages/Employee/Components/Chatbot/Chatbot_emp';
import Companions from './Pages/Companions/Companions';
import Forgot_password from './Pages/Reset_Password/Forgot_password';
import Reset_password from './Pages/Reset_Password/Reset_password';
import { useSelector } from 'react-redux';
import Verify_email_pass from './Pages/Verify-email/Verify_email_pass';
import ProfilePage from './Pages/Profile/profile';
import Manage_airplanes from './Pages/Employee/Manage_airplanes/Manage_airplanes';
import Manage_airports from './Pages/Employee/Manage_airports/Manage_airports';
import Read_reservation from './Pages/Employee/Read_reservation/Read_reservation';
import Profile from './Pages/Profile/Employee/profile';
import QuestionsPage from './Pages/QandA/QuestionsPage';
const OurServices =React.lazy(()=>import("./Pages/OurService/OurServices"));

import SeatSelection from './Pages/OurService/InfoCard/SeatSelection';
import BusinessClass from './Pages/OurService/InfoCard/BusinessClass';
import Entertainment from './Pages/OurService/InfoCard/Entertainment';
import TravelerMagazine from './Pages/OurService/InfoCard/TravelerMagazine';
import UnaccompaniedMinors from './Pages/OurService/InfoCard/UnaccompaniedMinors';
const Manage_policies =React.lazy(()=>import("./Pages/Employee/Manage_policies/Manage_policies"));

const Offers =React.lazy(()=>import("./Pages/Offers/Offers"));
const User_reservations =React.lazy(()=>import("./Pages/My_reservations/User_reservations"));
const VisaInfo =React.lazy(()=>import("./Pages/VisaInfo/VisaInfo"));

import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import Loading5 from './Components/Loading/Loading5';


const queryClient=new QueryClient();


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
    <QueryClientProvider client={queryClient}>
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


                    
                    <Route path="profile" element={user != undefined ?<ProfilePage/>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>
                    <Route path="answer-questions" element={role == undefined ?<QuestionsPage/>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>

                    {/* passenger page */}
                    <Route path="flight" element={role == undefined ? <FlightList />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="contact-us" element={role == undefined ?<Suspense fallback={<Loading5/>}><ContactUs /></Suspense> : <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="offers" element={role == undefined ?<Suspense fallback={<Loading5/>}><Offers /></Suspense> : <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="reservation" element={role == undefined ? <Companions />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="reservation_seats" element={role == undefined?<Reservation_seats />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="verifyEmail/:email" element={!user ? <verfiyEmail />: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>}/>
                    <Route path="my_reservations" element={role == undefined?<Suspense fallback={<Loading5/>}><User_reservations /></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>
                    <Route path="travel-condition" element={role == undefined?<Suspense fallback={<Loading5/>}><VisaInfo /></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>



                  {/* about page nested route */}
                    <Route path="about-us">
                    <Route index element={role == undefined?<Suspense fallback={<Loading5/>}><AboutUs /></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="our-mission" element={role == undefined?<Mission />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="our-fleet" element={role == undefined?<OurFleet />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="our-company" element={role == undefined?<OurCompany />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="our-responsibility" element={role == undefined?<OurResponsibility />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="ceos-letter" element={role == undefined?<ChairMan />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>
                    </Route>

                  {/* our service page nested route */}
                    <Route path="our-services">
                    <Route index element={role == undefined?<Suspense fallback={<Loading5/>}><OurServices /></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="unaccompanied-minors" element={role == undefined?<UnaccompaniedMinors />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="seat-selection" element={role == undefined?<SeatSelection />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="business-class" element={role == undefined?<BusinessClass />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="inflight-entertainment" element={role == undefined?<Entertainment />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="the-traveler-magazine" element={role == undefined?<TravelerMagazine />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    </Route>

                    </Route>

                     {/* employee page nested route */}
                    <Route path='/dashboard/employee' element={role != 4 && role != undefined ?<Layouts_dashboard/> : <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}>

                    <Route index element={role != 4 && role != undefined ?<Suspense fallback={<Loading5/>}><Employee/></Suspense>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="manage-offers" element={role != 4 && role != undefined ?<Manage_Offer/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="chatbot_emp" element={role != 4 && role != undefined ?<Chatbot_emp/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="reservation" element={role != 4 && role != undefined ?<Read_reservation/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="manage-flights" element={role != 4 && role != undefined ?<Manage_flights/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="manage-airplanes" element={role != 4 && role != undefined ?<Manage_airplanes/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="manage-airports" element={role != 4 && role != undefined ?<Manage_airports/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="answer-questions" element={role != 4 && role != undefined ?<QuestionsPage/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="profile" element={role != 4 && role != undefined ?<Profile/>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    
                    </Route>

                    {/* admin page nested route */}
                    <Route path="/admin_dashboard" element={role == 4 ?<Layouts_admin_dash/>:<Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}>     

                    <Route index element={role == 4 ?<Suspense fallback={<Loading5/>}><Admin/></Suspense> :<Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                     <Route path='manage-employees' element={role == 4 ? <Suspense fallback={<Loading5/>}><Manage_employees/></Suspense>: <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                    <Route path='manage-permissions' element={role == 4 ? <Suspense fallback={<Loading5/>}><Manage_permissions/></Suspense>: <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                    <Route path='manage-policies' element={role == 4 ? <Suspense fallback={<Loading5/>}><Manage_policies/></Suspense>: <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                    <Route path="view-history" element={role == 4 ?<Suspense fallback={<Loading5/>}><View_history/></Suspense> : <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>

                    
                    <Route path="profile" element={role == 4 ? <Profile/>: <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                    {/* <Route path="answer-questions" element={role == 4 ? <QuestionsPage/>: <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/> */}

                    </Route>

                    <Route path="/*" element={<Error_page/>}/>

            </Routes>

      
      </Router>
      <div id='go_up' className='hidden' onClick={()=>window.scrollTo(0,0)}>
      <Go_up />
      </div>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
      </QueryClientProvider>
    </div>
  );
};

export default App;