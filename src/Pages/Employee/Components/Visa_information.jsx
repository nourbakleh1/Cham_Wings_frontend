import React, { useEffect, useState } from 'react'
import Sidbar from '../../../Components/Sidbar/Sidbar'
import Chatbot from './Chatbot'

const Visa_information = () => {
  const [displaySidebar,setDisplaySidebar]=useState(false);
    useEffect(()=>{
      window.scrollTo(0,0);
    },[]);
  return (
    <div>
      <Sidbar displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}/>
    <div className='h-[1500px] bg-gradient-to-t bg-gray_color'>
    <Chatbot/>
    </div>
    </div>
  )
}

export default Visa_information