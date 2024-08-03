import React, { useEffect, useState } from 'react'
import Sidbar_Chat from './components/Sidbar_Chat'
import { faCode, faCompass, faLocationArrow, faPenToSquare, faPlaneUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../Chatbot/components/Sidbar_Chat.css"
import "animate.css"
import { ReactTyped } from "react-typed";

const Chatbot_emp = () => {
  const [result,setResult]=useState("A laptop computer or notebook computer, also known as a laptop or notebook,A laptop computer or notebook computer, also known as a laptop or notebookA laptop computer or notebook computer, also known as a laptop or notebookA laptop computer or notebook computer, also known as a laptop or notebook is a small, portable personal computer (PC). Laptops typically have a clamshell form factor with a flat-panel screen on the inside of the upper lid and an alphanumeric keyboard and pointing device on the inside of the lower lid.[1][2] Most of the computer's internal hardware is fitted inside the lower lid enclosure under the keyboard, although many modern laptops have a built-in webcam at the top of the screen, and some even feature a touchscreen display. In most cases, unlike tablet computers which run on mobile operating systems, laptops tend to run on desktop operating systems, which were originally developed for desktop computers.");
  const [search,setSearch]=useState("");

  useEffect(()=>{
    let search=document.getElementById("search");
    search.addEventListener("keyup",(e)=>{
      search.style.height ="40px";
      let scHeight=e.target.scrollHeight;
      search.style.height =`${scHeight}px`;
    })
  },[]);

  
  
  return (
    <div className='flex justify-between items-center'>
    <div className='relative flex flex-col justify-start items-start mt-[65px] h-[calc(100vh-65px)] w-full bg-black/80 md:w-[calc(100%-256px)] ml-0 sm:ml-auto'>

    <div className='w-[70%] mx-auto flex justify-center items-center text-[20px] gap-3  p-3'>
      <p className='text-primary_color font-bold text-[20px] p-3'>ChamAi</p>
      <img className='h-[30px] rounded-[50%]' src='/assets/images/logo_small.png'/>
    </div>
    {
      result ?<><section className='w-[70%] mx-auto'>
    <div className='my-[50px] text-[20px] sm:text-[30px] md:text-[40px] lg:text-[50px] text-[#c4c7c5] p-5'>
      <p className='animate__bounceIn'>
        <span className=" multe">Hello, John.</span>
      </p>
      <p className='animate__bounceIn'>How can i help you today?</p>
    </div>
    </section>

    <div className='cards w-[70%] mx-auto flex    justify-center text-[11px] gap-5    items-center text-white_color'>
      <div className='card bg-brown_color/50 p-2 h-[150px] flex flex-col justify-between items-start animate__myself'>
        <p>Help me find the latest trends</p>
        <FontAwesomeIcon icon={faCompass} className='bg-black p-1 rounded-xl'/>
      </div>
      <div className='card bg-brown_color/50 p-2 h-[150px] flex flex-col justify-between items-start animate__myself'>
        <p>Create an image & bedtime story</p>
        <FontAwesomeIcon icon={faPenToSquare} className='bg-black p-1 rounded-xl'/>
      </div>
      <div className='card bg-brown_color/50 p-2 h-[150px]  flex-col justify-between items-start hidden md:flex animate__myself'>
        <p>Find flights and weather for an upcoming trip</p>
        <FontAwesomeIcon icon={faPlaneUp} className='bg-black p-1 rounded-xl'/>
      </div>
      <div className='card bg-brown_color/50 p-2   flex-col justify-between items-start h-[150px] hidden md:flex animate__myself'>
        <p>Suggest a Python library to solve a problem</p>
        <FontAwesomeIcon icon={faCode} className='bg-black p-1 rounded-xl '/>
      </div>

    </div>
      </>:<>
      <div className=' w-[70%] mx-auto flex  result justify-start gap-1   flex-col items-start text-white_color'>
      <div className='flex justify-start items-center gap-3'>
        <img className='h-[30px] rounded-[50%]' src='/assets/images/user-avatar.png'/>
        <p className='text-[16px] text-[#e8e8e8]/80'>{search} || hello world</p>
      </div>

      <div className='flex justify-start mt-[50px] gap-5 items-start w-full  flex-col sm:flex-row'>
        <img className='h-[30px] rounded-[50%]' src='/assets/images/logo_small.png'/>
        {/* <div className='animate__bounceIn loader w-full '>
          <hr/>
          <hr/>
          <hr/>
        </div> */}
     
    {/* <div className=" w-[90%] flex  justify-start text-[16px] gap-5  flex-col items-start leading-relaxed font-bold text-[#e8e8e8]/80">
    <ReactTyped
          strings={[result]}
          typeSpeed={8}
        />
    </div> */}
    </div>
    </div>
    </>
    }
    

    <div className='w-[70%] mx-auto animate__slideInUp z-20 absolute bottom-[5%] left-[15%]'>
    <div className='animate__myself flex items-center justify-between relative gap-5 bg-black/10 px-5 py-2 rounded-[50px]'>
      <textarea id="search" value={search} onChange={(e)=>setSearch(e.target.value)} className='rubberBand w-full resize-none max-h-[150px] h-[40px] bg-transparent border-none outline-none p-2 text-[18px] text-white' required  placeholder='Enter a prompt here'></textarea>
      <div>
      <FontAwesomeIcon icon={faLocationArrow} className='text-white absolute right-[10px] bottom-[5px] translate-y-[-50%]  text-[25px] w-[35px] border-transparent rotate-45'/>
      </div>
    </div>
    <p className='text-[13px] text-gray_color text-center mt-3'>
    ChamAi may display inaccurate info, including about people, so double-check its responses.
    </p>
    </div>
    

        </div>
        <Sidbar_Chat/>

        </div>
  )
}

export default Chatbot_emp