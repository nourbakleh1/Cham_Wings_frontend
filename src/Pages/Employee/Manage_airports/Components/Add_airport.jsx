import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LargeModal from '../../../../Components/Modal/LargeModal';
import Headings from '../../../../Components/Headings/Headings';
import Button from '../../../../Components/Button/Button';
import { AddFlight, getFlights } from '../../../../Redux/ApiSlices/employee/manageFlightsSlice';
import Modal from '../../../../Components/Modal/Modal';
import { AddAirport } from '../../../../Redux/ApiSlices/employee/airportSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
// import "./../Manage_emp.css"


const Add_airport = ({setOpen2,open2}) => {
    const dispatch = useDispatch();
    

    
    
  
    //  state adding airport
    
    const [airport_name,setAirport_name]=useState("");
    const [city,setCity]=useState("");
    const [country,setCountry]=useState("");
    const [airport_code,setAirport_code]=useState("");
    const [image,setImage]=useState(null);


    const handelAdd=(e)=>{
        e.preventDefault();
       
      
        if(airport_name.trim() == ""){
            return toast.error("Airport name is required")
        }
        if(airport_code.trim() == ""){
            return toast.error("Airport code is required")
        }
       
        if(city.trim() == ""){
            return toast.error("City is required")
        }
        if(country.trim() == ""){
            return toast.error("Country is required")
        }
        if(image == null){
            return toast.error("Image is required")
        }
        const formdata=new FormData();
        formdata.append("airport_name",airport_name);
        formdata.append("city",city);
        formdata.append("country",country);
        formdata.append("airport_code",airport_code);
        formdata.append("image",image);
        
       
       
        dispatch(AddAirport(formdata)).unwrap().then((res)=>{
            setOpen2(!open2);
            
            setAirport_name("");
            setAirport_code("");
            setCity("");
            setImage(null);
            setCountry("");
            return toast.success(res?.success)
        }).catch((rej)=>{
            return toast.error(rej?.response?.data?.message)
        })
    }
  return (
    <Modal open={open2} setOpen={setOpen2}>
        <form className="max-w-[90%] mx-auto" onSubmit={handelAdd}>
        <div className='border-b-2 border-solid border-primary_color w-fit mx-auto mb-6'>
            <Headings element={"h3"} color='#00529B' >add airport</Headings>
            </div>
       
  
 
 
  
  
  <div className="grid md:grid-cols-1 md:gap-6">
   
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="text" value={airport_name} onChange={(e)=>setAirport_name(e.target.value)}  name="floating_name" id="floating_miles" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Airport name</label>
    </div>
  </div>
  <div className="grid md:grid-cols-1 md:gap-6">
   
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="text" value={airport_code} onChange={(e)=>setAirport_code(e.target.value)}  name="floating_name" id="floating_code" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_code" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Airport code</label>
    </div>
  </div>
  <div className="grid md:grid-cols-1 md:gap-6">
   
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="text" value={city} onChange={(e)=>setCity(e.target.value)}  name="floating_name" id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
    </div>
  </div>
  <div className="grid md:grid-cols-1 md:gap-6">
   
   <div className="relative z-0 w-full mb-1 lg:mb-4 group">
       <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)}  name="floating_name" id="floating_country" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
       <label htmlFor="floating_country" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label>
   </div>
 </div>
 <div className="relative  z-0 w-full mb-1 lg:mb-4 group">
  
  <input  onChange={(e)=>setImage(e.target.files[0])}  class="hidden w-full text-sm text-black  rounded-lg cursor-pointer bg-transparent outline-none" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
  <div class=" font-bold text-primary_color px-2   py-2  my-1 rounded-lg cursor-pointer bg-transparent outline-none border-b-4 border-dashed border-secoundary_color/50 shadow-sm shadow-primary_color  focus:outline-none" ><label htmlFor="user_avatar" className="flex justify-center gap-5 items-center"> {image ? image?.name :<p className='text-sm'>upload airport image</p>}<Headings element={"p"}></Headings> <FontAwesomeIcon icon={faImages}className='text-[22px] text-secoundary_color bg-white rounded-[50%]  ' /></label></div>
  </div>
 
   
      <div className='flex justify-center items-center my-5'><Button color={"#836E42"} padding='5px'>Submit</Button></div> 
</form>
            </Modal>
  )
}

export default Add_airport