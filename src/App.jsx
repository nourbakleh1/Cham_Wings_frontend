import React, { useEffect, useRef, useState, Suspense } from 'react';

import { BrowserRouter as  Router, Routes,Route, Navigate } from 'react-router-dom';
// global
const Home =React.lazy(()=>import("./Pages/Home/Home"));
import Layouts from './Components/Layouts/Layouts';
import Go_up from './Components/Go_up/Go_up';
const Register =React.lazy(()=>import("./Pages/Forms/Register/Register"));
const Login =React.lazy(()=>import("./Pages/Forms/Login/Login"));
const AboutUs =React.lazy(()=>import("./Pages/AboutUs/AboutUs"));
import Mission from './Pages/AboutUs/Mission';
import OurFleet from './Pages/AboutUs/OurFleet';
import OurCompany from './Pages/AboutUs/OurCompany';
import OurResponsibility from './Pages/AboutUs/OurResponsibility';
import ChairMan from './Pages/AboutUs/ChairMan';
const ContactUs =React.lazy(()=>import("./Pages/ContactUs/ContactUs"));
const Forgot_password =React.lazy(()=>import("./Pages/Reset_Password/Forgot_password"));
const Reset_password =React.lazy(()=>import("./Pages/Reset_Password/Reset_password"));
const Verify_email_pass =React.lazy(()=>import("./Pages/Verify-email/Verify_email_pass"));

const Verify_email =React.lazy(()=>import('./Pages/Verify-email/Verify_email'));
const Error_page =React.lazy(()=>import('./Pages/Error_page/Error_page'));

// passenger

const FlightList =React.lazy(()=>import('./Pages/Flight/FlightList'));
const Reservation_seats =React.lazy(()=>import('./Pages/Reservation_seats/Reservation_seats'));
const VisaInfo =React.lazy(()=>import('./Pages/VisaInfo/VisaInfo'));
const User_reservations =React.lazy(()=>import('./Pages/My_reservations/User_reservations'));
const Companions =React.lazy(()=>import('./Pages/Companions/Companions'));
const Offers =React.lazy(()=>import('./Pages/Offers/Offers'));
const QuestionsPage =React.lazy(()=>import('./Pages/QandA/QuestionsPage'));
const ProfilePage =React.lazy(()=>import('./Pages/Profile/profile'));



const OurServices =React.lazy(()=>import('./Pages/OurService/OurServices'));
import SeatSelection from './Pages/OurService/InfoCard/SeatSelection';
import BusinessClass from './Pages/OurService/InfoCard/BusinessClass';
import Entertainment from './Pages/OurService/InfoCard/Entertainment';
import TravelerMagazine from './Pages/OurService/InfoCard/TravelerMagazine';
import UnaccompaniedMinors from './Pages/OurService/InfoCard/UnaccompaniedMinors';




// emp
import Layouts_dashboard from './Components/Layouts/Layouts_dashboard';
const Employee =React.lazy(()=>import('./Pages/Employee/Employee'));
const Manage_Offer =React.lazy(()=>import('./Pages/Employee/Components/Manage_offers/Manage_Offer'));
const Manage_flights =React.lazy(()=>import('./Pages/Employee/Manage_flights/Manage_flights'));
const Chatbot_emp =React.lazy(()=>import('./Pages/Employee/Components/Chatbot/Chatbot_emp'));
const Manage_airplanes =React.lazy(()=>import('./Pages/Employee/Manage_airplanes/Manage_airplanes'));
const Manage_airports =React.lazy(()=>import('./Pages/Employee/Manage_airports/Manage_airports'));
const Read_reservation =React.lazy(()=>import('./Pages/Employee/Read_reservation/Read_reservation'));
const Profile =React.lazy(()=>import('./Pages/Profile/Employee/profile'));




// admin
import Layouts_admin_dash from './Components/Layouts/Layouts_admin_dash';

const Admin =React.lazy(()=>import('./Pages/Admin/Admin'));
const View_history =React.lazy(()=>import('./Pages/Admin/Components/View_history'));
const Manage_employees =React.lazy(()=>import('./Pages/Admin/Components/Manage_employees/Manage_employees'));
const Manage_permissions =React.lazy(()=>import('./Pages/Admin/Components/Manage_employees/Manage_permissions'));
const Manage_policies =React.lazy(()=>import('./Pages/Employee/Manage_policies/Manage_policies'));



import { useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import { ToastContainer } from 'react-toastify';
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
                    <Route index element={role == undefined ?<Suspense fallback={<Loading5/>}><Home/></Suspense>:<Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>

                      {/* auth routes */}
                    <Route path="register" element={!user ? <Suspense fallback={<Loading5/>}> <Register /></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>} />
                    <Route path="login" element={!user ?<Suspense fallback={<Loading5/>}> <Login /></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>} />
                    <Route path="verify-email/:email" element={!user ?<Suspense fallback={<Loading5/>}><Verify_email/></Suspense> : <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>}/>
                    <Route path="verify-email_pass/:email" element={!user ? <Suspense fallback={<Loading5/>}><Verify_email_pass/></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>}/>
                    <Route path="forgot_password" element={!user ? <Suspense fallback={<Loading5/>}><Forgot_password/></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>}/>
                    <Route path="reset_password" element={!user ? <Suspense fallback={<Loading5/>}><Reset_password/></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>}/>

                    {/* global routes */}
                    <Route path="contact-us" element={role == undefined ? <Suspense fallback={<Loading5/>}><ContactUs /></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    {/* about page nested route */}
                 
                    <Route path="about-us">
                    
                    <Route index element={role == undefined? <Suspense fallback={<Loading5/>}> <AboutUs /></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="our-mission" element={role == undefined?<Mission />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="our-fleet" element={role == undefined?<OurFleet />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="our-company" element={role == undefined?<OurCompany />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="our-responsibility" element={role == undefined?<OurResponsibility />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="ceos-letter" element={role == undefined?<ChairMan />: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>
                    </Route>


                    
                    <Route path="profile" element={user != undefined ?<Suspense fallback={<Loading5/>}> <ProfilePage/></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>
                    <Route path="answer-questions" element={role == undefined ?<Suspense fallback={<Loading5/>}> <QuestionsPage/></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>

                    {/* passenger page */}
                    <Route path="flight" element={role == undefined ?<Suspense fallback={<Loading5/>}> <FlightList /></Suspense> : <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="offers" element={role == undefined ?<Suspense fallback={<Loading5/>}> <Offers /></Suspense> : <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="reservation" element={role == undefined ? <Suspense fallback={<Loading5/>}> <Companions /></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    <Route path="reservation_seats" element={role == undefined?<Suspense fallback={<Loading5/>}> <Reservation_seats /></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>} />
                    {/* <Route path="verifyEmail/:email" element={!user ? <verfiyEmail />: <Navigate to={role == 4 ? "/admin_dashboard":role == undefined ?"/":"/dashboard/employee"}/>}/> */}
                    <Route path="my_reservations" element={role == undefined?<Suspense fallback={<Loading5/>}> <User_reservations /></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>
                    <Route path="travel-condition" element={role == undefined?<Suspense fallback={<Loading5/>}> <VisaInfo /></Suspense>: <Navigate to={role == 4 ? "/admin_dashboard":"/dashboard/employee"}/>}/>



                  

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
                    <Route path="manage-offers" element={role != 4 && role != undefined ?<Suspense fallback={<Loading5/>}><Manage_Offer/></Suspense>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="chatbot_emp" element={role != 4 && role != undefined ?<Suspense fallback={<Loading5/>}><Chatbot_emp/></Suspense>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="reservation" element={role != 4 && role != undefined ?<Suspense fallback={<Loading5/>}><Read_reservation/></Suspense>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="manage-flights" element={role != 4 && role != undefined ?<Suspense fallback={<Loading5/>}><Manage_flights/></Suspense>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="manage-airplanes" element={role != 4 && role != undefined ?<Suspense fallback={<Loading5/>}><Manage_airplanes/></Suspense>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="manage-airports" element={role != 4 && role != undefined ?<Suspense fallback={<Loading5/>}><Manage_airports/></Suspense>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="answer-questions" element={role != 4 && role != undefined ?<Suspense fallback={<Loading5/>}><QuestionsPage/></Suspense>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    <Route path="profile" element={role != 4 && role != undefined ?<Suspense fallback={<Loading5/>}><Profile/></Suspense>: <Navigate to={role == undefined ? "/":role == 4 ?"/admin_dashboard":null}/>}/>
                    
                    </Route>

                    {/* admin page nested route */}
                    <Route path="/admin_dashboard" element={role == 4 ?<Layouts_admin_dash/>:<Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}>     

                    <Route index element={role == 4 ?<Suspense fallback={<Loading5/>}> <Admin/></Suspense>:<Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                     <Route path='manage-employees' element={role == 4 ?<Suspense fallback={<Loading5/>}><Manage_employees/></Suspense> : <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                    <Route path='manage-permissions' element={role == 4 ?<Suspense fallback={<Loading5/>}><Manage_permissions/></Suspense> : <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                    <Route path='manage-policies' element={role == 4 ?<Suspense fallback={<Loading5/>}><Manage_policies/></Suspense> : <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                    <Route path="view-history" element={role == 4 ?<Suspense fallback={<Loading5/>}><View_history/></Suspense> : <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>

                    
                    <Route path="profile" element={role == 4 ? <Profile/>: <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/>
                    {/* <Route path="answer-questions" element={role == 4 ? <QuestionsPage/>: <Navigate to={role == undefined ? "/":"/dashboard/employee"}/>}/> */}

                    </Route>

                    <Route path="/*" element={<Suspense fallback={<Loading5/>}> <Error_page/></Suspense>}/>

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