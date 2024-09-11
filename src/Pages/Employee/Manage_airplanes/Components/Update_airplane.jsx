import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAirplanes, updateAirplane } from '../../../../Redux/ApiSlices/employee/ManageAirplanesSlice';
import Headings from '../../../../Components/Headings/Headings';
import Modal from '../../../../Components/Modal/Modal';
import Button from '../../../../Components/Button/Button';


const Update_airplane = ({open,setOpen,page, model, setModel, manufacturer,airplane_info, setManufacturer, range, setRange}) => {
        const dispatch = useDispatch();

        const handelUpdate=(e)=>{
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
                model,manufacturer,range
            }
            const airplane = {id:airplane_info?.data.airplane_id,data}
            dispatch(updateAirplane(airplane)).unwrap().then((res)=>{
               
               
            if(window.sessionStorage.getItem("page")){
                const Savedpage= JSON.parse(window.sessionStorage.getItem("page"));
            dispatch(getAirplanes(Savedpage || 1));
        }
    
                setOpen(!open);
                return toast.success(res?.success)
            }).catch((rej)=>{
                return toast.error(rej?.response?.data?.message)
            })
        }
  return (
    <Modal open={open} setOpen={setOpen}>
        <form className="max-w-[90%] mx-auto" onSubmit={handelUpdate}>
        <div className='border-b-2 border-solid border-primary_color w-fit mx-auto mb-6'>
            <Headings element={"h3"} color='#00529B' >edit airplane</Headings>
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
 
   
      <div className='flex justify-center items-center my-5'><Button color={"#836E42"} padding='5px'>Update</Button></div> 
</form>
            </Modal>
  )
}

export default Update_airplane