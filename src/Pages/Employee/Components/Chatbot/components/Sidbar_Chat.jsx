import React, { useState } from 'react'
import "./Sidbar_Chat.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleQuestion, faMessage, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Headings from '../../../../../Components/Headings/Headings';

const Sidbar_Chat = ({setOldchat,setSearch,setResult}) => {
    const [showSidbar,setShowSidbar]=useState(true);

    const handel_sideWidth=()=>{
        let x= document.getElementById("aside").classList.toggle("handelWidth");
        
    }
    
  return (
    <aside id="aside" className='min-h-screen inline-flex  flex-col w-[60px] text-center items-center justify-between bg-black_color text-white py-[90px]'>
    <div className='flex flex-col gap-5 justify-between items-center  h-[320px] w-full'>
    <div className=' mb-6 p-2 border-t-4 border-t-secoundary_color rounded-2xl  border-b-4 border-b-primary_color_1 cursor-pointer' onClick={()=>{setShowSidbar(!showSidbar);handel_sideWidth()}}>
    {
        showSidbar ?  <FontAwesomeIcon  icon={faBars} className='text-[20px]   text-white_color  hover:text-primary_color'/>:
        <FontAwesomeIcon icon={faXmark} className='text-[20px]  text-white_color  hover:text-secoundary_color'/>
    }
    </div>
    <div className='cursor-pointer'>
        <FontAwesomeIcon icon={faPlus} className='text-[20px] bg-secoundary_color_1/50 p-2 rounded-2xl text-white_color hover:text-primary_color' onClick={()=>{setOldchat([]);setSearch(""),setResult("")}}/>
        {!showSidbar && <p className=' p-2 text-primary_color text-[14px]'>
            New chat
        </p> }
    </div>
    <div>
    
    {!showSidbar && <><p className='text-gray_color my-6'>What is recent ...</p>
    <ul className='flex justify-between items-center w-full flex-col gap-3'>
        <li className='flex justify-between gap-2 items-center flex-col sm:flex-row'>
        <FontAwesomeIcon icon={faMessage} className='text-[10px] bg-primary_color_1/50 p-2  rounded-2xl text-white_color hover:text-primary_color'/>
           <span className='text-[13px]'>what is html</span> 
        </li>
        <li className='flex justify-between gap-2 items-center flex-col sm:flex-row'>
        <FontAwesomeIcon icon={faMessage} className='text-[10px] bg-primary_color_1/50 p-2  rounded-2xl text-white_color hover:text-primary_color'/>
        <span className='text-[13px]'>what is html</span>

        </li>
        <li className='flex justify-between gap-2 items-center flex-col sm:flex-row'>
        <FontAwesomeIcon icon={faMessage} className='text-[10px] bg-primary_color_1/50 p-2  rounded-2xl text-white_color hover:text-primary_color'/>
        <span className='text-[13px]'>what is html</span>

        </li>
    </ul>
    </>}
    </div>
    </div>
    {showSidbar &&<div className='overflow-hidden text-ellipsis'>
        <FontAwesomeIcon icon={faMessage} className='text-[20px] bg-primary_color_1/50 p-2  rounded-2xl text-white_color hover:text-primary_color'/>

    </div>}
    <div>
    <FontAwesomeIcon icon={faCircleQuestion} className='text-[20px]  bg-secoundary_color_1/50 p-2  rounded-2xl   text-white_color hover:text-primary_color'/>
    {!showSidbar &&<p>Help</p>}
    </div>
    </aside>
  )
}

export default Sidbar_Chat