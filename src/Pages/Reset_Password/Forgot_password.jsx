import React, { useState } from 'react'
import Headings from '../../Components/Headings/Headings'
import Button from '../../Components/Button/Button'
import "./Reset.css"

const Forgot_password = () => {
  const [email,setEmail]=useState("");
  return (
    <div className="flex flex-col lg:flex-row min-h-[50vh]  lg:min-h-[75vh] overflow-hidden">
    <div className="lg:w-1/2 bg-secoundary_color_1 text-center min-h-[50vh]  lg:min-h-[75vh] py-32 px-6 md:px-40 flex gap-5  flex-col justify-center">

      <Headings element={"p"} color_P='#fff'>Forgot Password</Headings>
      <input id={"input"} type="email" className='outline-none bg-transparent text-white  border-b-2 border-double p-2  border-white_color mb-3' placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <Button color={"#00529B"} padding='5px'>Send</Button>

    </div>

   <div className="lg:w-1/2 justify-center items-center hidden lg:block bg-gray-300 mt-[70px]">
    <img src='/assets/images/forgot.svg' className='bg-center h-full w-[70%] m-auto'/>
    </div>
    </div>
  )
}

export default Forgot_password