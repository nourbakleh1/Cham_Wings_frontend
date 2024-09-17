import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AddOffer, getallFlights } from '../../../../../Redux/ApiSlices/employee/ManageOffersSlice';
import Headings from '../../../../../Components/Headings/Headings';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../../Components/Button/Button';
import Modal from '../../../../../Components/Modal/Modal';
import { toast } from 'react-toastify';
import useDateFormat from '../../../../../utilities/useDateFormat';

// import "./../Manage_emp.css"


const Add_offer = ({setOpen3,open3}) => {
    const dispatch = useDispatch();
  const {Flights}=useSelector((state)=>state.offers);


    
    useEffect(()=>{
        dispatch(getallFlights())
    },[])
    
    
  
    //  state adding offer
    
    const [description,setDescription]=useState("");
   const [start_date,setStart_date]=useState(null);
   const [end_date,setEnd_date]=useState(null);
   const [image,setImage]=useState(null);
   const [title,setTitle]=useState("");
   const [flight_id,setFlight_id]=useState(null);
   const [discount,setDiscount]=useState(null);


    const handelAdd=(e)=>{
        e.preventDefault();
       
      
        if(description.trim() == ""){
            return toast.error("Description is required")
        }
        if(title.trim() == ""){
            return toast.error("Title is required")
        }
        if(start_date == null){
            return toast.error("Start_date is required")
        }
        if(end_date == null){
            return toast.error("End_date is required")
        }
        if(flight_id == null){
            return toast.error("Flight_id is required")
        }
        if(discount == null){
            return toast.error("Discount is required")
        }
        
        if(image == null){
            return toast.error("Image is required")
        }
        const formdata=new FormData();
        formdata.append("description",description);
        formdata.append("title",title);
        formdata.append("start_date",useDateFormat( start_date));
        formdata.append("end_date",useDateFormat(end_date));
        formdata.append("flight_id",flight_id);
        formdata.append("discount",discount);
        formdata.append("image",image);
        
       
       
        dispatch(AddOffer(formdata)).unwrap().then((res)=>{
            setOpen3(!open3);
            
            setDescription("");
            setTitle("");
            setStart_date(null);
            setEnd_date(null);
            setFlight_id(null);
            setDiscount(null);
            setImage(null);
            return toast.success(res?.success)
        }).catch((rej)=>{
            return toast.error(rej?.response?.data?.errors)
        })
    }
  return (
    <Modal open={open3} setOpen={setOpen3}>
        <form className="max-w-[90%] mx-auto" onSubmit={handelAdd}>
        <div className='border-b-2 border-solid border-primary_color w-fit mx-auto mb-6'>
            <Headings element={"h3"} color='#00529B' >add offer</Headings>
            </div>
       
  
 
 
  
  
  <div className="grid md:grid-cols-1 md:gap-6">
   
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}  name="desc" id="floating_miles" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="desc" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
    </div>
  </div>
  <div className="grid md:grid-cols-1 md:gap-6">
   
   <div className="relative z-0 w-full mb-1 lg:mb-4 group">
       <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}  name="title" id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
       <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
   </div>
 </div>
 <div className="grid md:grid-cols-1 md:gap-6">
   
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="number" value={discount} onChange={(e)=>setDiscount(e.target.value)}  name="dis" id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="dis" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Discount</label>
    </div>
  </div>
 
            <div className='flex flex-col justify-center items-center gap-6'>
            <div className='flex items-center gap-3 justify-between   flex-col lg:flex-row'>
            <label className='text-[12px] md:text-[16px] text-primary_color_1  '>Start date</label>
            <DatePicker
            className={`mt-1 block w-full border-b-2 outline-none text-center font-bold bg-white z-[1000000000000] mb-3 text-secoundary_color_1 border-primary_color md:text-[16px] focus:border-indigo-500 focus:ring-0 sm:text-sm p-1 rounded-2xl bg-transparent`}
            selected={start_date} 
            onChange={(date) => setStart_date(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="departure_date"
            minDate={new Date()}
            
                 />
            </div>  
            </div>
            <div className='flex flex-col justify-center items-center gap-6'>
            <div className='flex items-center gap-3 justify-between   flex-col lg:flex-row'>
           <label className='text-[12px] md:text-[16px] text-primary_color_1  '>End date</label>
            <DatePicker
            className={`mt-1 block w-full border-b-2 outline-none text-center font-bold bg-white z-[1000000000000] text-secoundary_color_1 my-4 border-primary_color md:text-[16px] focus:border-indigo-500 focus:ring-0 sm:text-sm p-1 rounded-2xl bg-transparent`}
            selected={end_date} 
            onChange={(date) => setEnd_date(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="departure_date"
            minDate={new Date()}
            
                 />
            </div>  
            </div>
            <div className='flex justify-center items-center flex-col lg:flex-row  gap-2'>
                <span className='text-[12px] md:text-[16px] text-primary_color_1   '>Fligt number</span>
                <select name="roundtrip" defaultValue={"trip"} className='bg-white p-1 text-center text-secoundary_color w-[200px]   mb-4 rounded-2xl text-[14px]  font-bold border-primary_color border-solid border-b-2 select_option' value={flight_id} onChange={(e)=>setFlight_id(e.target.value)}>
                <option value={"trip"} disabled>Select...</option>
                {
                    Flights?.data?.map((el)=>{
                        return <option key={el.flight_id} value={el?.flight_id} >number:{el?.flight_number}<br/></option>
                    })
                }

            </select>
            </div>
  
  
  
 
 <div className="relative  z-0 w-full mb-1 lg:mb-4 group">
  <input  onChange={(e)=>setImage(e.target.files[0])}  class="hidden w-full text-sm text-black  rounded-lg cursor-pointer bg-transparent outline-none" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
  <div class=" font-bold text-primary_color px-2   py-2  my-1 rounded-lg cursor-pointer bg-transparent outline-none border-b-4 border-dashed border-secoundary_color/50 shadow-sm shadow-primary_color  focus:outline-none" ><label htmlFor="user_avatar" className="flex justify-center gap-5 items-center"> {image ? image?.name :<p className='text-sm'>upload offer image</p>}<Headings element={"p"}></Headings> <FontAwesomeIcon icon={faImages}className='text-[22px] text-secoundary_color bg-white rounded-[50%]  ' /></label></div>
  </div>
 
   
      <div className='flex justify-center items-center my-5'><Button color={"#836E42"} padding='5px'>Create</Button></div>
</form>
            </Modal>
  )
}

export default Add_offer