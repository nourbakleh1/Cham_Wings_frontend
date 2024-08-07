import React, { useState } from 'react'
import "./Reset.css"
import Button from '../../Components/Button/Button'
import Headings from '../../Components/Headings/Headings'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetPassword } from '../../Redux/ApiSlices/authSlice'
import Loading2 from '../../Components/Loading/Loading2'

const Reset_password = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {isLoading}=useSelector((state)=>state.auth)
  const [new_password,setnew_password]=useState("")
  const [confirm_password,setconfirm_password]=useState("")


  const handelReset=()=>{
      if(new_password.trim() == ""){
        return toast.error("new password is required")
      }
      if(confirm_password.trim() == ""){
        return toast.error("Confirm password is required")
      }
      const data={new_password,confirm_password}
      dispatch(resetPassword(data)).unwrap().then((res)=>{
        navigate("/login",{replace:true});
        return toast.success(res.success);
      }).catch((rej)=>{
        return toast.error(rej?.response?.data?.errors)
      })
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[50vh]  lg:min-h-[85vh] overflow-hidden">
    <div className="lg:w-1/2 bg-secoundary_color_1 text-center min-h-[50vh]  lg:min-h-[85vh] py-32 px-6 md:px-40 flex gap-5  flex-col justify-center">

      <Headings element={"p"} color_P='#fff'>Reset Password</Headings>
      <input  type="password" className='outline-none bg-transparent text-white  border-b-2 border-double p-2  border-white_color mb-3' placeholder='Enter new password ' value={new_password} onChange={(e)=>setnew_password(e.target.value)} />
      <input  type="password" className='outline-none bg-transparent text-white  border-b-2 border-double p-2  border-white_color mb-3' placeholder='Enter confirm password ' value={confirm_password} onChange={(e)=>setconfirm_password(e.target.value)} />

     {isLoading ?<div className="bg-white w-fit mx-auto rounded-lg flex justify-center items-center"><Loading2/></div>:
      <Button onClick={handelReset} color={"#00529B"} padding='5px'>Send</Button>}

    </div>

   <div className="lg:w-1/2 justify-center items-center hidden lg:block bg-gray-300 mt-[70px]">
    <img src='/assets/images/reset.svg' className='bg-center h-full w-[70%] m-auto'/>
    </div>
    </div>
  )
}

export default Reset_password