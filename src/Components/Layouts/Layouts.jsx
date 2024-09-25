import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
// import Chatbot_user from '../Chatbot_user/Chatbot_user';
import { useSelector } from 'react-redux';
const Layouts = () => {
  const {user}=useSelector(state=>state.auth);
  return (
    <div>
   <Header/>
   <Outlet/>
   {/* { user && <Chatbot_user/>} */}
   <Footer/>

    </div>
  )
}

export default Layouts;