import React, { useEffect, useState } from 'react'
import Chatbot from './Components/Chatbot';

const Employee = () => {
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

export default Employee