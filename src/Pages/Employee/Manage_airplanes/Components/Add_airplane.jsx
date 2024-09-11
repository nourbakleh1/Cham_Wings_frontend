import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '../../../../Components/Modal/Modal';
import Headings from '../../../../Components/Headings/Headings';
import { AddAirplane } from '../../../../Redux/ApiSlices/employee/ManageAirplanesSlice';
import Button from '../../../../Components/Button/Button';
// import "./../Manage_emp.css"


const Add_airplane = ({setOpen2,open2}) => {
    const dispatch = useDispatch();
    

    
    
  
    //  state adding airplane
    
    const [model,setModel]=useState("");
    const [manufacturer,setManufacturer]=useState("");
    const [range,setRange]=useState("");


    const handelAdd=(e)=>{
        e.preventDefault();
       
      
        if(model.trim() == ""){
            return toast.error("Model is required")
        }
        if(manufacturer.trim() == ""){
            return toast.error("Manufacturer is required")
        }
        if(range.trim() == ""){
            return toast.error("Range is required")
        }
       
        const data={
            model,range,manufacturer
        }
       
       
        dispatch(AddAirplane(data)).unwrap().then((res)=>{
            setOpen2(!open2);
            
            setModel("");
            setManufacturer("");
            setRange("");
            return toast.success(res?.success)
        }).catch((rej)=>{
            return toast.error(rej?.response?.data?.message)
        })
    }
  return (
    <Modal open={open2} setOpen={setOpen2}>
        <form className="max-w-[90%] mx-auto" onSubmit={handelAdd}>
        <div className='border-b-2 border-solid border-primary_color w-fit mx-auto mb-3'>
            <Headings element={"h3"} color='#00529B' >add  airplane</Headings>
            </div>
  
  <div className="grid md:grid-cols-1 md:gap-6">
   
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="text" value={model} onChange={(e)=>setModel(e.target.value)}  name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Model</label>
    </div>
  </div>
  <div className="grid md:grid-cols-1 md:gap-6">
   
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="text" value={manufacturer} onChange={(e)=>setManufacturer(e.target.value)}  name="floating_name" id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Manufacturer</label>
    </div>
  </div>
  <div className="grid md:grid-cols-1 md:gap-6">
   
   <div className="relative z-0 w-full mb-1 lg:mb-4 group">
       <input type="text" value={range} onChange={(e)=>setRange(e.target.value)}  name="floating_name" id="floating_country" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
       <label htmlFor="floating_country" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">range</label>
   </div>
 </div>
 
   
      <div className='flex justify-center items-center my-5'><Button color={"#836E42"} padding='5px'>Submit</Button></div> 
</form>
            </Modal>
  )
}

export default Add_airplane