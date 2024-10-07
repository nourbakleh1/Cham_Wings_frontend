import React, { useEffect, useRef, useState } from 'react'
import Sidbar_Chat from './components/Sidbar_Chat'
import { faCode, faCompass, faLocationArrow, faPenToSquare, faPlaneUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../Chatbot/components/Sidbar_Chat.css"
import { ReactTyped } from "react-typed";
import { useDispatch, useSelector } from 'react-redux'
import { getChat, SendAndReceive,change_view, getThreads } from '../../../../Redux/ApiSlices/employee/chatbotSlice'
import { toast } from 'react-toastify'

const Chatbot_emp = () => {
  const [input_text,setInput_text]=useState("");
  const ref=useRef(null);
  const referance=useRef(null);
  const dispatch=useDispatch();
  const {chat,view,isLoading_chat}=useSelector((state)=>state.chatbot)
  const [isLoading,setIsLoading]=useState(null);
  const [thread_id_chat,setThread_id]=useState(null);
  const {user}=useSelector(state=>state.auth)
  
  const [newChat,setNewchat]=useState([])
  

//loading
  const Loading =
     <div id='result' className='w-[100%]  mx-auto flex justify-start gap-1 mb-[50px] flex-col items-start text-white_color'>

     <div className='flex justify-start items-center gap-3'>
        <img className='h-[30px] rounded-[50%]' src='/assets/images/user-avatar.png'/>
        <p className='text-[16px] text-[#000]/80 selection:text-white'>{referance.current?.value}</p>
      </div>
     
     <div className='flex justify-start mt-[50px] gap-5 items-start w-full  mb-[50px] flex-col sm:flex-row' >
        <img className='h-[30px] rounded-[50%]' src='/assets/images/logo_small.png'/><div className='animate__myself loader w-full'>
    <hr/>
    <hr/>
    <hr/>
  </div></div></div>;

  
  

  //search explaned
  useEffect(()=>{
    let search=document.getElementById("search");
    search.addEventListener("keyup",(e)=>{
      search.style.height ="40px";
      let scHeight=e.target.scrollHeight;
      search.style.height =`${scHeight}px`;
    })
    
  },[]);

  
  //go dwon
  useEffect(()=>{
  ref.current?.scrollIntoView({behavior :'smooth',block:"end"})
  },[newChat])

  const handelstate=(e)=>{
    e.preventDefault();
    if(input_text.trim() == ""){
      return toast.error("input field is required")
    }
    setIsLoading(true)
    if(view == true){ 
      dispatch(change_view(false))
    }
    
    const data={
      input_text
    }
    if(thread_id_chat != null){
      data.thread_id=thread_id_chat
    }
    dispatch(SendAndReceive(data)).unwrap().then((res)=>{
      if(window.sessionStorage.getItem("id") == null){
        window.sessionStorage.setItem("id",JSON.stringify(res?.thread_id));
        dispatch(getThreads());
      }
      setIsLoading(false)
      setNewchat((prev)=>{
        document.getElementById("bottom")?.classList?.add("translate-y-[200px]");
        return [...prev,{input:<div className='text-black selection:text-white'>{input_text}</div>,output:
       
        <div className='text-black selection:text-white'><ReactTyped
          strings={[res?.answer]}
          typeSpeed={7}
          showCursor={false}
        /></div>}]
      })
    }).catch((rej)=>{
      return toast.error(rej?.response?.date?.message)
    })
      
      setInput_text("")
  }

  // handel chat and persisted thread
  useEffect(()=>{
    if(window.sessionStorage.getItem("id") != null){
      let id = JSON.parse(window.sessionStorage.getItem("id"));
      handelChat(id)
    }
  else{
    dispatch(change_view(true))
  }
  },[])


  const handelChat=(id)=>{
    window.sessionStorage.setItem("id",JSON.stringify(id));
    if(view == true){
      dispatch(change_view(false))
    }
    dispatch(getChat(id)).unwrap().then((res)=>{
      setThread_id(id)
      setNewchat([]);
    })

}
  const oneCard="Give me 5 different phrases in Japanese to learn.";
  const twoCard="Help me finish my gaming podcast tagline: play, win, and ....";
  const threeCard="Find flights to Miami for New Years. What's the usual temperature then?";
  const fourCard="How can I list all processes that have been running longer than an hour in linux?";
  
  return (
    <div className='flex justify-between items-center'>
    <div className='relative flex flex-col justify-start items-start mt-[72px] h-[calc(100vh-71px)] w-full bg-off_white/10 lg:w-[calc(100%-296px)] ml-0 sm:ml-auto'>

    <div className='w-[70%] mx-auto flex justify-center items-center text-[20px] gap-3  p-3'>
      <p className='text-primary_color font-bold text-[13px] lg:text-[20px]  p-3'>ChamAI</p>
      <img className='h-[20px] lg:h-[30px] rounded-[50%]' src='/assets/images/logo_small.png'/>
    </div>
    {
      view ?<><section className='w-[70%] mx-auto'>
    <div className='my-[30px] text-[20px] sm:text-[22px] md:text-[25px] lg:text-[35px] xl:text-[45px] text-[#c4c7c5] p-0 2xl:p-5'>
      <p className='animate__myself'>
        <span className="multe">Welcome to ChamAI</span>
      </p>
      <p className='animate__myself'>I am here to help you ...</p>
    </div>
    </section>

    <div className='cards w-[70%] mx-auto flex    justify-center text-[11px] gap-5    items-center text-white_color'>
      <div className='card bg-secoundary_color/50  p-2 w-[200px] shadow-xl shadow-primary_color/40 text-center m-2 sm:m-0 h-auto md:h-[150px] rounded-full  flex flex-col justify-between items-start animate__myself cursor-pointer' onClick={()=>setInput_text(oneCard)}>
        <p className='mt-5 mx-2'>Help me find the latest trends</p>
        <FontAwesomeIcon icon={faCompass} className='bg-black/20 p-1 m-5 rounded-xl'/>
      </div>
      <div className='card bg-secoundary_color/50 p-2 w-[200px] shadow-xl shadow-primary_color/40 h-[150px] text-center flex-col justify-between rounded-full hidden md:flex items-start animate__myself cursor-pointer' onClick={()=>setInput_text(twoCard)}>
        <p className='mt-5 mx-2'>Create an image & bedtime story</p>
        <FontAwesomeIcon icon={faPenToSquare} className='bg-black/20 p-1 m-5 rounded-xl'/>
      </div>
      <div className='card bg-secoundary_color/50 p-2 w-[200px] h-[150px] text-center shadow-xl shadow-primary_color/40  flex-col justify-between rounded-full items-start hidden md:flex animate__myself cursor-pointer' onClick={()=>setInput_text(threeCard)}>
        <p className='mt-5 mx-2'>Find flights and weather for an upcoming trip</p>
        <FontAwesomeIcon icon={faPlaneUp} className='bg-black/20 p-1 m-5 rounded-xl'/>
      </div>
      <div className='card bg-secoundary_color/50 p-2 w-[200px] text-center align-middle shadow-xl shadow-primary_color/40   flex-col justify-between items-start rounded-full h-[150px] hidden md:flex animate__myself cursor-pointer' onClick={()=>setInput_text(fourCard)}>
        <p className='mt-5 mx-2'>Suggest a Python library to solve a problem</p>
        <FontAwesomeIcon icon={faCode} className='bg-black/20 p-1 m-5 rounded-xl '/>
      </div>

    </div>
      </>:<>
      {
        isLoading_chat ?<> <div id='result'  className=' w-[70%] mx-auto flex  result justify-start gap-1 mb-[50px] flex-col items-start text-white_color'>{Loading}
        </div>
        <div id='result'  className=' w-[70%] mx-auto flex  result justify-start gap-1 mb-[50px] flex-col items-start text-white_color'>{Loading}
        </div>
        
        </> :
        <div id='result'  className=' w-[70%] mx-auto flex  result justify-start gap-1 mb-[50px] flex-col items-start text-white_color'>
      
       { chat?.map((el,idx)=>{
          return(<div key={idx}>
            <div  >
      <div className='flex justify-start items-center gap-3 text-black'>
        {el?.input_text ? <img className='h-[30px] rounded-[50%]' src='/assets/images/user-avatar.png'/> : null}
        <p className='text-[16px]  text-[#000]/80 selection:text-white'>{el?.input_text}</p>
      </div>

      <div className='flex justify-start mt-[50px] gap-5 items-start w-full  mb-[50px] flex-col sm:flex-row'>
      {
        el?.response_text ?<img className='h-[30px] rounded-[50%]' src='/assets/images/logo_small.png'/>:null
      }
        
       
     
    <div className=" w-[90%] flex   justify-start text-[16px] gap-5  flex-col items-start leading-relaxed font-bold text-[#000]/80">
        <p className='selection:text-white'>{el?.response_text}</p>
    </div>
    </div>
    </div>
    
    </div>
          )    })
      }
      { newChat?.map((el,idx)=>{
          return(<div key={idx}>
            <div  >
      <div className='flex justify-start items-center gap-3'>
        {el?.input ? <img className='h-[30px] rounded-[50%]' src='/assets/images/user-avatar.png'/> : null}
        <p className='text-[16px]  text-[#000]/80 selection:text-white'>{el?.input}</p>
      </div>

      <div className='flex justify-start mt-[50px] gap-5 items-start w-full  mb-[50px] flex-col sm:flex-row'>
      {
        el?.output ?<img className='h-[30px] rounded-[50%]' src='/assets/images/logo_small.png'/>:null
      }
        
       
     
    <div className=" w-[90%] flex   justify-start text-[16px] gap-5  flex-col items-start leading-relaxed font-bold text-[#000]/80">
        <p className='selection:text-white'>{el?.output}</p>
    </div>
    </div>
    </div>
    
    </div>
          )    })
      }
      {isLoading && Loading}
      <div ref={ref} id='bottom' className='opacity-0'>k</div>
      </div>
      }
      
      
    </>
    }
    
    <form onSubmit={handelstate}>
    <div className='w-[70%] mx-auto bg-transparent absolute bottom-[2%] left-[15%]'>
    <div className='animate__myself flex items-center justify-between relative gap-5 bg-black/40 px-5 py-2 rounded-[50px]'>
   
      <input id="search" type='text' required ref={referance} value={input_text} onChange={(e)=>setInput_text(e.target.value)}  className='rubberBand w-full  resize-none  h-[30px] sm:h-[40px] bg-transparent border-none outline-none p-0 sm:p-2 text-[12px] text-white md:text-[18px] text-whiteplaceholder:text-[10px] placeholder:md:text-[12px] placeholder:text-white'  placeholder='Enter your question here ...'/>
      <div>
      <button type='submit'><FontAwesomeIcon icon={faLocationArrow}  className='text-white absolute right-[10px] bottom-[5px] translate-y-[-50%] text-[20px] sm:text-[25px] w-[35px] border-transparent rotate-45'/></button>
      </div>
     
    </div>
    <p className='text-[13px] text-gray_color text-center mt-3'>
    ChamAI may display inaccurate info, including about people, so double-check its responses.
    </p>
    </div>
    </form>

        </div>
        <Sidbar_Chat setSearch={setInput_text} setNewchat={setNewchat} view={view} change_view={change_view} handelChat={handelChat}/>

        </div>
  )
}

export default Chatbot_emp