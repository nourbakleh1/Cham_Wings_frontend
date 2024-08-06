import React, { useState } from 'react'
import "./Reset.css"
import Button from '../../Components/Button/Button'
import Headings from '../../Components/Headings/Headings'

const Reset_password = () => {
  const [password,setPassword]=useState("")
  const [Confirmpassword,setConfirmpassword]=useState("")

  return (
    <div className="flex flex-col lg:flex-row min-h-[50vh]  lg:min-h-[85vh] overflow-hidden">
    <div className="lg:w-1/2 bg-secoundary_color_1 text-center min-h-[50vh]  lg:min-h-[85vh] py-32 px-6 md:px-40 flex gap-5  flex-col justify-center">

      <Headings element={"p"} color_P='#fff'>Reset Password</Headings>
      <input  type="password" className='outline-none bg-transparent text-white  border-b-2 border-double p-2  border-white_color mb-3' placeholder='Enter new password ' value={password} onChange={(e)=>setPassword(e.target.value)} />
      <input  type="password" className='outline-none bg-transparent text-white  border-b-2 border-double p-2  border-white_color mb-3' placeholder='Enter confirm password ' value={Confirmpassword} onChange={(e)=>setConfirmpassword(e.target.value)} />

      <Button color={"#00529B"} padding='5px'>Send</Button>

    </div>

   <div className="lg:w-1/2 justify-center items-center hidden lg:block bg-gray-300 mt-[70px]">
    <img src='/assets/images/reset.svg' className='bg-center h-full w-[70%] m-auto'/>
    </div>
    </div>
  )
}

export default Reset_password