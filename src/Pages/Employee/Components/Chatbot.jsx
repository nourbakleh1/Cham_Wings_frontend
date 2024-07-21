import { faLocationArrow, faRectangleXmark, faRobot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Headings from '../../../Components/Headings/Headings';

const Chatbot = () => {
    const [openChat,setOpenChat]=useState(false);
  return (
    <>
    <button onClick={()=>setOpenChat(!openChat)}>
    {openChat ?<FontAwesomeIcon icon={faRectangleXmark} className='text-[40x] h-[30px] sm:h-[40px] text-secoundary_color cursor-pointer fixed bg-transparent bottom-[5%] right-[5%] z-[555]'/>
     :<FontAwesomeIcon icon={faRobot} className='text-[40px] h-[30px] sm:h-[40px] text-primary_color cursor-pointer fixed bg-transparent bottom-[5%] right-[5%] z-[555]'/>}
    </button>

    {openChat && 
    <div className='bg-off_white h-[500px] w-[200px] sm:w-[400px] fixed bottom-[10.5%] right-[5%] z-[9999]'>
    <h2 className='bg-secoundary_color_1 text-white py-1 text-[18px] text-center '>
    Cham wings
    </h2>
    <div className='bg-off_white w-full h-[410px] overflow-y-auto p-3'>
      <p className='bg-primary_color w-fit mt-1 ml-auto rounded-2xl text-start p-2 text-white'>hello</p>
      <p className='bg-secoundary_color w-fit mt-1 rounded-2xl text-end p-2 text-white'>welcome</p>
      <p className='bg-primary_color w-fit mt-1 ml-auto rounded-2xl text-start p-2 text-white'>hello</p>
      <p className='bg-secoundary_color w-fit mt-1 rounded-2xl text-end p-2 text-white'>welcome</p><p className='bg-primary_color w-fit mt-1 ml-auto rounded-2xl text-start p-2 text-white'>hello</p>
      <p className='bg-secoundary_color w-fit mt-1 rounded-2xl text-end p-2 text-white'>welcome</p><p className='bg-primary_color w-fit mt-1 ml-auto rounded-2xl text-start p-2 text-white'>hello</p>
      <p className='bg-secoundary_color w-fit mt-1 rounded-2xl text-end p-2 text-white'>welcome</p>
      <p className='bg-primary_color w-fit mt-1 ml-auto rounded-2xl text-start p-2 text-white'>hello</p>
      <p className='bg-secoundary_color w-fit mt-1 rounded-2xl text-end p-2 text-white'>welcome</p><p className='bg-primary_color w-fit mt-1 ml-auto rounded-2xl text-start p-2 text-white'>hello</p>
      <p className='bg-secoundary_color w-fit mt-1 rounded-2xl text-end p-2 text-white'>welcome</p><p className='bg-primary_color w-fit mt-1 ml-auto rounded-2xl text-start p-2 text-white'>hello</p>
      <p className='bg-secoundary_color w-fit mt-1 rounded-2xl text-end p-2 text-white'>welcome</p>
      
    </div>

    <div id="" className='absolute  bottom-0 left-0 sm:w-[400px] w-full   focus:outline-none border-[2px] border-primary_color border-solid'>
      <textarea  style={{height:"auto"}} className='border-0 bg-off_white focus:bg-off_white  w-full pr-[35px] overflow-hidden outline-none ' placeholder='message'></textarea>
      <button className='absolute bg-primary_color rounded-full cursor-pointer right-0 top-[50%] translate-y-[-50%]'>
      <FontAwesomeIcon icon={faLocationArrow} className='text-white  text-[25px] w-[35px] border-transparent rotate-45'/>
      </button>
    </div>
    </div>
    }
    </>
  )
}

export default Chatbot