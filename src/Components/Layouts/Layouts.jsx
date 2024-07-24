import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import Chatbot_user from '../Chatbot_user/Chatbot_user';
const Layouts = () => {
  return (
    <div >
   <Header/>
   <Outlet/>
   <Chatbot_user/>
   <Footer/>

    </div>
  )
}

export default Layouts;