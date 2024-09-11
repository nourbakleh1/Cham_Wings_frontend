import React from 'react'
import { useDispatch } from 'react-redux';
import Modal from '../../../../Components/Modal/Modal';
import Headings from '../../../../Components/Headings/Headings';
import Button from '../../../../Components/Button/Button';
import { getALLAirports, updateAirport } from '../../../../Redux/ApiSlices/employee/airportSlice';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import LargeModal from '../../../../Components/Modal/LargeModal';


const Update_airport = ({open,setOpen,page, city,setCountry,image,setImage ,country,setCity,select_image, airport_name, airport_code,setAirport_name, airport_info,setAirport_code}) => {
        const dispatch = useDispatch();

        const handelUpdate=(e)=>{
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
            const formdata=new FormData();
            formdata.append("airport_name",airport_name);
            formdata.append("city",city);
            formdata.append("country",country);
            formdata.append("airport_code",airport_code);
            
           
            if(image){
                formdata.append("image",image);
            }
    
            
            const airport = {id:airport_info?.data.airport_id,formdata}
            dispatch(updateAirport(airport)).unwrap().then((res)=>{
                setAirport_name("");
                setAirport_code("");
                setCity("");
                setCountry("");
               
            if(window.sessionStorage.getItem("page")){
                const Savedpage= JSON.parse(window.sessionStorage.getItem("page"));
            dispatch(getALLAirports(Savedpage || 1));
        }
    
                setOpen(!open);
                return toast.success(res?.success)
            }).catch((rej)=>{
                return toast.error(rej?.response?.data?.message)
            })
        }
  return (
    <LargeModal open={open} setOpen={setOpen}>
        <form className="max-w-[90%] mx-auto" onSubmit={handelUpdate}>
        <div className='border-b-2 border-solid border-primary_color w-fit mx-auto mb-6'>
            <Headings element={"h3"} color='#00529B' >edit airport</Headings>
            </div> 
       
  
 
 
            <div className="w-full relative mb-2 flex justify-start items-start flex-col gap-1">
           <div className='flex justify-evenly  p-2 items-center w-fit m-auto flex-col gap-2  rounded-xl'>
           <div className='relative'><img className=' h-20 w-36 sm:w-26 sm:h-36 bg-black/15 lg:w-40 lg:h-40 shadow-xl shadow-primary_color rounded-[30%] ' src={image? URL.createObjectURL(image): airport_info?.data?.image ?`http://127.0.0.1:8000`+airport_info?.data?.image: select_image}/></div>
            <input   onChange={(e)=>setImage(e.target.files[0])} id={"user_avatar_help"}  className=" w-full text-sm text-black py-1 hidden  my-3 rounded-lg cursor-pointer bg-transparent outline-none border-b-4 border-dashed border-secoundary_color shadow-sm  focus:outline-none" aria-describedby="user_avatar_help"  type="file"/>
            <label className=" absolute top-[60%] left-[52%] text-sm sm:text-md font-bold text-secoundary_color p-3 rounded-[50%]" htmlFor="user_avatar_help"><FontAwesomeIcon icon={faImages}className='text-[20px] sm:text-[40px] bg-white  text-secoundary_color rounded-[40%] p-2  border-2 border-solid border-black/50 ' /></label>
    
        </div>
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
 
   
      <div className='flex justify-center items-center my-5'><Button color={"#836E42"} padding='5px'>Update</Button></div> 
</form>
            </LargeModal>
  )
}

export default Update_airport