import React, { useRef, useState } from 'react';
import Headings from '../../Components/Headings/Headings';
import { Link, useParams } from 'react-router-dom';
import "./Verify.css"
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Verify_email = () => {
    const [verify_code,setVerify_code]=useState("");
    const {email}=useParams();
    const ref=useRef();
    
    const handelVerify = (data)=>{
      if(ref.current.value.length >4)
      {
        setVerify_code("")
        return toast.error("It must contain four digits")
      }

        

    }
  return (
    <div className="flex flex-col lg:flex-row min-h-[68vh] overflow-hidden ">
  <div className="lg:w-1/2 bg-secoundary_color text-center min-h-[68vh] py-32 px-6 md:px-40 flex gap-5  flex-col justify-center">
        
        <Headings element={"h2"} color='#fff' >Verify Email</Headings>
        <Headings element={"p"}>please check your email</Headings>
        
        <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-[120px] text-secoundary_color p-5 rounded-[50%] bg-gray_color  mx-auto my-[20px]"/>
        
        <div className='my-5 flex justify-center items-center flex-col gap-3 bg-secoundary_color_1 p-4  m-auto w-fit   rounded-lg'>
        <label className='text-white'>enter your code here</label>
        <input ref={ref} className='text-primary_color w-[75px] text-[30px]  p-1 bg-transparent  border-b-4 border-dashed border-white_color outline-none' type="number" 
        value={verify_code} onChange={(e)=>{setVerify_code(e.target.value) ; e.target.value.length >= 4 && handelVerify(e.target.value) }} />

        </div>
        
        
   
   </div>
   <div className="lg:w-1/2 justify-center items-center hidden lg:block bg-gray-300 mt-[70px]">
    <img src='/assets/images/verify.svg' className='bg-center h-full w-[70%] m-auto'/>
    </div>
  
   
    </div>
  )
}

export default Verify_email;