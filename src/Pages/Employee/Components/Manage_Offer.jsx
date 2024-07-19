import React, { useEffect } from 'react'
import Chatbot from './Chatbot';

const Manage_Offer = () => {
    useEffect(()=>{
      window.scrollTo(0,0);
    },[]);
  return (
    <div>
    <div className='h-[1500px] bg-gradient-to-t bg-gray_color'>
    <Chatbot/>
    </div>
    </div>
  )
}

export default Manage_Offer