import { faLocationArrow, faRectangleXmark, faRobot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Headings from '../../../Components/Headings/Headings';

const Chatbot = () => {
    const [openChat,setOpenChat]=useState(false);
  return (
    <>
    <button onClick={()=>setOpenChat(!openChat)}>
    {openChat ?<FontAwesomeIcon icon={faRectangleXmark} className='text-[40px] h-[50px] text-secoundary_color cursor-pointer fixed bg-transparent bottom-[7%] right-[5%] z-[555]'/>
     :<FontAwesomeIcon icon={faRobot} className='text-[40px] h-[50px] text-primary_color cursor-pointer fixed bg-transparent bottom-[7%] right-[5%] z-[555]'/>}
    </button>

    {openChat && 
    <div className='bg-white h-[450px] w-[200px] sm:w-[400px] fixed bottom-[13.5%] right-[5%] z-[99999]'>
    <h2 className='bg-secoundary_color_1 text-white py-1 text-[20px] text-center rounded-ee-2xl rounded-es-2xl'>
    Cham wings
    </h2>
    <div className='bg-off_white w-full h-[370px] overflow-y-auto p-3'>
      <p className='bg-primary_color w-fit mt-1 ml-auto rounded-2xl text-start p-2 text-white'>hello</p>
      <p className='bg-secoundary_color w-fit mt-1 rounded-2xl text-end p-2 text-white'>welcome</p>
      <p className='bg-primary_color w-fit mt-1 ml-auto rounded-2xl text-start p-2 text-white'>hello</p>
      <p className='bg-secoundary_color w-fit mt-1 rounded-2xl text-end p-2 text-white'>welcome</p><p className='bg-primary_color w-fit mt-1 ml-auto rounded-2xl text-start p-2 text-white'>hello</p>
      <p className='bg-secoundary_color w-fit mt-1 rounded-2xl text-end p-2 text-white'>welcome</p><p className='bg-primary_color w-fit mt-1 ml-auto rounded-2xl text-start p-2 text-white'>hello</p>
      <p className='bg-secoundary_color w-fit mt-1 rounded-2xl text-end p-2 text-white'>welcome</p>

      
    </div>

    <div className='absolute bottom-0 left-0 sm:w-[400px] w-[100px] flex justify-start items-center focus:outline-none border-[2px] border-primary_color border-solid'>
      <input type="text" className='border-0 outline-none focus:bg-transparent sm:grow-[1]' placeholder='message'/>
      <button>
      <FontAwesomeIcon icon={faLocationArrow} className='text-secoundary_color text-[30px] w-[50px] border-transparent rotate-45'/>
      </button>
    </div>
    </div>
    }
    </>
  )
}

export default Chatbot