import React, { useEffect, useRef, useState } from 'react'
import Sidbar_Chat from './components/Sidbar_Chat'
import { faCode, faCompass, faLocationArrow, faPenToSquare, faPlaneUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../Chatbot/components/Sidbar_Chat.css"
import { ReactTyped } from "react-typed";

const Chatbot_emp = () => {
  const [result,setResult]=useState("A laptop computer or notebook computer, also known as a laptop or notebook,A laptop computer or notebook computer, also known as a laptop or notebookA laptop computer or notebook computer, also known as a laptop or notebookA laptop computer or notebook computer, also known as a laptop or notebook is a small, portable personal computer (PC). Laptops typically have a clamshell form factor with a flat-panel screen on the inside of the upper lid and an alphanumeric keyboard and pointing device on the inside of the lower lid.[1][2] Most of the computer's internal hardware is fitted inside the lower lid enclosure under the keyboard, although many modern laptops have a built-in webcam at the top of the screen, and some even feature a touchscreen display. In most cases, unlike tablet computers which run on mobile operating systems, laptops tend to run on desktop operating systems, which were originally developed for desktop computers.");
  const [search,setSearch]=useState("");
  const ref=useRef(null);


  const [oldChat,setOldchat]=useState([
    {
      input:"idvjksdkvksdvdv",
      output:"a laptop or notebook,A laptop computer or notebook computer,"
    },
    {
      input:"idvjksdkvksdvdv",
      output:"a laptop or notebook,A laptop computer or notebook computer,"
    }
  ])

  useEffect(()=>{
    let search=document.getElementById("search");
    search.addEventListener("keyup",(e)=>{
      search.style.height ="40px";
      let scHeight=e.target.scrollHeight;
      search.style.height =`${scHeight}px`;
    })
    
  },[]);

  useEffect(()=>{
  ref.current?.scrollIntoView({behavior :'smooth',block:"end"})
  },[oldChat])
  const handelstate=()=>{
    
      setOldchat((prev)=>{
        document.getElementById("bottom").classList.add("translate-y-[200px]");
        return [...prev,{input:<div className='shad1'>{search}</div>,output:<><div className='animate__myself loader w-full '>
          <hr/>
          <hr/>
          <hr/>
        </div><div className='shad'><ReactTyped
          strings={["A laptop computer or notebook computer, also known as a laptop or notebook,A laptop computer or notebook computer, also known as a laptop or notebookA laptop computer or notebook computer, also known as a laptop or notebookA laptop computer or notebook computer, also known as a laptop or notebook is a small, portable personal computer (PC). Laptops typically have a clamshell form factor with a flat-panel screen on the inside of the upper lid and an alphanumeric keyboard and pointing device on the inside of the lower lid.[1][2] Most of the computer's internal hardware is fitted inside the lower lid enclosure under the keyboard, although many modern laptops have a built-in webcam at the top of the screen, and some even feature a touchscreen display. In most cases, unlike tablet computers which run on mobile operating systems, laptops tend to run on desktop operating systems, which were originally developed"]}
          typeSpeed={8}
          showCursor={false}
        /></div></>}]
      })
      setSearch("")
  }
  const oneCard="Give me 5 different phrases in Japanese to learn.";
  const twoCard="Help me finish my gaming podcast tagline: play, win, and ....";
  const threeCard="Find flights to Miami for New Years. What's the usual temperature then?";
  const fourCard="How can I list all processes that have been running longer than an hour in linux?";
  
  return (
    <div className='flex justify-between items-center'>
    <div className='relative flex flex-col justify-start items-start mt-[65px] h-[calc(100vh-65px)] w-full bg-[#000]/90 md:w-[calc(100%-256px)] ml-0 sm:ml-auto'>

    <div className='w-[70%] mx-auto flex justify-center items-center text-[20px] gap-3  p-3'>
      <p className='text-primary_color font-bold text-[20px] p-3'>ChamAi</p>
      <img className='h-[30px] rounded-[50%]' src='/assets/images/logo_small.png'/>
    </div>
    {
      !result ?<><section className='w-[70%] mx-auto'>
    <div className='my-[50px] text-[20px] sm:text-[30px] md:text-[40px] lg:text-[50px] text-[#c4c7c5] p-5'>
      <p className='animate__myself'>
        <span className=" multe">Hello, John.</span>
      </p>
      <p className='animate__myself'>How can i help you today?</p>
    </div>
    </section>

    <div className='cards w-[70%] mx-auto flex    justify-center text-[11px] gap-5    items-center text-white_color'>
      <div className='card bg-brown_color/50 p-2 h-[150px] flex flex-col justify-between items-start animate__myself cursor-pointer' onClick={()=>setSearch(oneCard)}>
        <p>Help me find the latest trends</p>
        <FontAwesomeIcon icon={faCompass} className='bg-black p-1 rounded-xl'/>
      </div>
      <div className='card bg-brown_color/50 p-2 h-[150px] flex flex-col justify-between items-start animate__myself cursor-pointer' onClick={()=>setSearch(twoCard)}>
        <p>Create an image & bedtime story</p>
        <FontAwesomeIcon icon={faPenToSquare} className='bg-black p-1 rounded-xl'/>
      </div>
      <div className='card bg-brown_color/50 p-2 h-[150px]  flex-col justify-between items-start hidden md:flex animate__myself cursor-pointer' onClick={()=>setSearch(threeCard)}>
        <p>Find flights and weather for an upcoming trip</p>
        <FontAwesomeIcon icon={faPlaneUp} className='bg-black p-1 rounded-xl'/>
      </div>
      <div className='card bg-brown_color/50 p-2   flex-col justify-between items-start h-[150px] hidden md:flex animate__myself cursor-pointer' onClick={()=>setSearch(fourCard)}>
        <p>Suggest a Python library to solve a problem</p>
        <FontAwesomeIcon icon={faCode} className='bg-black p-1 rounded-xl '/>
      </div>

    </div>
      </>:<>
      <div id='result'  className=' w-[70%] mx-auto flex  result justify-start gap-1 mb-[50px] flex-col items-start text-white_color'>
       { oldChat.map((el,idx)=>{
          return(
            <div key={idx} >
      <div className='flex justify-start items-center gap-3'>
        <img className='h-[30px] rounded-[50%]' src='/assets/images/user-avatar.png'/>
        <p className='text-[16px] text-[#e8e8e8]/80'>{el.input}</p>
      </div>

      <div className='flex justify-start mt-[50px] gap-5 items-start w-full  mb-[50px] flex-col sm:flex-row'>
        <img className='h-[30px] rounded-[50%]' src='/assets/images/logo_small.png'/>
       
     
    <div className=" w-[90%] flex  justify-start text-[16px] gap-5  flex-col items-start leading-relaxed font-bold text-[#e8e8e8]/80">
        <p>{el.output}</p>
    </div>
    </div>
    </div>
   

          )
        })
      }
      <div ref={ref} id='bottom' className='opacity-0'>k</div>
      </div>
    </>
    }
    

    <div className='w-[70%] mx-auto bg-transparent absolute bottom-[2%] left-[15%]'>
    <div className='animate__myself flex items-center justify-between relative gap-5 bg-black/10 px-5 py-2 rounded-[50px]'>
      <textarea id="search" value={search} onChange={(e)=>setSearch(e.target.value)}  className='rubberBand w-full resize-none max-h-[150px] h-[40px] bg-transparent border-none outline-none p-2 text-[18px] text-white'  placeholder='Enter a prompt here'></textarea>
      <div>
      <button onClick={handelstate}><FontAwesomeIcon icon={faLocationArrow}  className='text-white absolute right-[10px] bottom-[5px] translate-y-[-50%]  text-[25px] w-[35px] border-transparent rotate-45'/></button>
      </div>
    </div>
    <p className='text-[13px] text-gray_color text-center mt-3'>
    ChamAi may display inaccurate info, including about people, so double-check its responses.
    </p>
    </div>
    

        </div>
        <Sidbar_Chat setSearch={setSearch} setOldchat={setOldchat} setResult={setResult}/>

        </div>
  )
}

export default Chatbot_emp