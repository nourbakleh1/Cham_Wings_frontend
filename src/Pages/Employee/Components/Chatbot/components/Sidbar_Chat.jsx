import React, { useEffect, useState } from 'react'
import "./Sidbar_Chat.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleQuestion, faMessage, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Headings from '../../../../../Components/Headings/Headings';
import { useDispatch, useSelector } from 'react-redux';
import { getThreads } from '../../../../../Redux/ApiSlices/chatbotSlice';

const Sidbar_Chat = ({setNewchat,setSearch,handelChat,change_view,view}) => {
    const [showSidbar,setShowSidbar]=useState(true);
    const dispatch=useDispatch();
    const {threads}=useSelector((state)=>state.chatbot);
    const handel_sideWidth=()=>{
        let x= document.getElementById("aside").classList.toggle("handelWidth");
        
    }
    useEffect(()=>{
        dispatch(getThreads())
    },[]);

    const handelNewChat=()=>{
        setNewchat([]);
        setSearch("");
        handelChat(null);
        if(window.sessionStorage.getItem("id") != null){
            window.sessionStorage.removeItem("id");
            
          }

          if(view == false){
                dispatch(change_view(true))
          }
        
    }

    
    
  return (
    <aside id="aside" className='min-h-screen inline-flex absolute right-0   flex-col w-[40px] sm:w-[60px] text-center items-center justify-between bg-black_color text-white py-[90px]'>
    <div className='flex flex-col gap-5 justify-between items-center  h-[320px] w-full'>
    <div className=' mb-6 p-2 border-t-4 border-t-secoundary_color rounded-2xl  border-b-4 border-b-primary_color_1 cursor-pointer' onClick={()=>{setShowSidbar(!showSidbar);handel_sideWidth()}}>
    {
        showSidbar ?  <FontAwesomeIcon  icon={faBars} className='text-[12px] sm:text-[20px]   text-white_color  hover:text-primary_color'/>:
        <FontAwesomeIcon icon={faXmark} className='text-[12px] sm:text-[20px]  text-white_color  hover:text-secoundary_color'/>
    }
    </div>
    <div className='cursor-pointer'>
        <FontAwesomeIcon icon={faPlus} className='text-[12px] sm:text-[20px]  bg-secoundary_color_1/50 p-2 rounded-2xl text-white_color hover:text-primary_color' onClick={handelNewChat}/>
        {!showSidbar && <p className=' p-2 text-primary_color text-[14px]'>
            New chat
        </p> }
    </div>
    <div>
    
    {!showSidbar && <><p className='text-gray_color my-6'>What is recent ...</p>
    <ul className='leatest flex justify-start items-center w-full flex-col gap-3 h-[280px] overflow-y-scroll '>
        {
            threads?.map((thread)=>{
              return  <li key={thread.thread_id} className='flex bg-secoundary_color_1/20 rounded-lg shadow-sm shadow-primary_color mx-2 p-1 justify-center gap-1 items-center flex-col sm:flex-row' onClick={()=>{handelChat(thread.thread_id)}}>
        <FontAwesomeIcon icon={faMessage} className='text-[12px] bg-primary_color_1/50 p-2  rounded-2xl text-white_color hover:text-primary_color'/>
           <span className='text-[11px] text-ellipsis w-[80%] text-white_color/70 font-extrabold overflow-hidden'>{thread?.title}</span>
        </li>
            })
       
        }
    </ul>
    </>}
    </div>
    </div>
    {showSidbar &&<div className='overflow-hidden text-ellipsis'>
        <FontAwesomeIcon icon={faMessage} className='text-[12px] sm:text-[20px]  bg-primary_color_1/50 p-2  rounded-2xl text-white_color hover:text-primary_color'/>

    </div>}
    <div className='translate-y-20 sm:translate-y-10'>
    <FontAwesomeIcon icon={faCircleQuestion} className='text-[12px] sm:text-[20px]    bg-secoundary_color_1/50 p-2  rounded-2xl   text-white_color hover:text-primary_color'/>
    {!showSidbar &&<p>Help</p>}
    </div>
    </aside>
  )
}

export default Sidbar_Chat