import React, { useEffect} from 'react'
import Chatbot from './Chatbot'

const Answer_Questions = () => {
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

export default Answer_Questions