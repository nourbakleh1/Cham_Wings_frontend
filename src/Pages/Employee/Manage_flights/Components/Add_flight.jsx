import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LargeModal from '../../../../Components/Modal/LargeModal';
import Headings from '../../../../Components/Headings/Headings';
import Button from '../../../../Components/Button/Button';
import { getAirplanes } from '../../../../Redux/ApiSlices/employee/ManageAirplanesSlice';
import { getAirports } from '../../../../Redux/ApiSlices/airportSlice';
import { AddFlight, getFlights } from '../../../../Redux/ApiSlices/employee/manageFlightsSlice';
// import "./../Manage_emp.css"


const Add_Flight = ({setOpen2,open2,airplanes,All_airports}) => {
    const dispatch = useDispatch();
    

    
    
  
    //  state adding emp
    const [departure_airport,setDeparture_airport]=useState(null);
    const [arrival_airport,setArrival_airport]=useState(null);
    const [airplane_id,setAirplane_id]=useState(null);
    const [flight_number,setFlight_number]=useState(null);
    const [price,setPrice]=useState(null);
    const [departure_terminal,setDeparture_terminal]=useState("");
    const [arrival_terminal,setArrival_terminal]=useState("");
    const [miles,setMiles]=useState(null);


    const handelAdd=(e)=>{
        e.preventDefault();
       
        if(departure_airport == null){
            return toast.error("Departure airport is required")
        }
        if(arrival_airport == null){
            return toast.error("Arrival airport is required")

        }
        if(airplane_id == null){
            return toast.error("airplane is required")
        }
        if(flight_number == null){
            return toast.error("Flight number is required")
        }
        if(price == null){
            return toast.error("Price is required")
        }
        if(departure_terminal.trim() == ""){
            return toast.error("Departure terminal is required")
        }
        if(arrival_terminal.trim() == ""){
            return toast.error("Arrival terminal is required")
        }
       
        if(miles == null){
            return toast.error("Miles is required")
        }
        const data={
            departure_airport,arrival_airport,departure_terminal,arrival_terminal,price,miles,airplane_id,flight_number
        }
       
       
        dispatch(AddFlight(data)).unwrap().then((res)=>{
            setOpen2(!open2);
            setAirplane_id(null);
            setArrival_airport(null);
            setDeparture_airport(null);
            setFlight_number(null);
            setDeparture_terminal("");
            setArrival_terminal("");
            setMiles(null);
            setPrice(null)
            return toast.success(res?.success)
        }).catch((rej)=>{
            return toast.error(rej?.response?.data?.message)
        })
    }
  return (
    <LargeModal open={open2} setOpen={setOpen2}>
        <form className="max-w-[90%] mx-auto" onSubmit={handelAdd}>
        <Headings element={"h1"}>Add flight</Headings>
        <div className='flex justify-between items-center md:gap-6 flex-wrap sm:flex-nowrap'>
        
  <div className="relative z-0 w-full mb-1 lg:mb-4 group flex justify-between items-center flex-col">
  <span className='text-[12px] md:text-[14px] text-primary_color_1 pr-2'>Departure airport</span>

  <select name="roundtrip" defaultValue={"trip"} className='bg-white p-4 text-center text-secoundary_color w-[190px] lg:w-[350px] rounded-2xl text-[12px] md:text-[16px] font-bold border-primary_color border-solid border-b-2 select_option' value={departure_airport} onChange={(e)=>setDeparture_airport(e.target.value)}>
                <option value={"trip"} disabled>Select...</option>
                {All_airports?.data?.map((airport)=>{
                   return <option key={airport?.airport_id} value={airport?.airport_id}>{airport?.airport_name}({airport?.airport_code})</option>
                })
                }
                

            </select>
  </div>
  <div className="relative z-0 w-full mb-1 lg:mb-4 group flex justify-between items-center flex-col">
  <span className='text-[12px] md:text-[16px] text-primary_color_1 pr-2'>Arrival airport</span>

  <select name="roundtrip" defaultValue={"trip"} className='bg-white p-4 text-center text-secoundary_color w-[190px] lg:w-[350px] rounded-2xl text-[12px] md:text-[16px] font-bold border-primary_color border-solid border-b-2 select_option' value={arrival_airport} onChange={(e)=>setArrival_airport(e.target.value)}>
                <option value={"trip"} disabled>Select...</option>
                {All_airports?.data?.map((airport)=>{
                   return <option key={airport?.airport_id} value={airport?.airport_id}>{airport?.airport_name}({airport?.airport_code})</option>
                })
                }
            </select>
  </div>
  
  </div>
  
  <div className="relative z-0 w-full mb-1 lg:mb-4 group flex justify-between items-center flex-col ">
  <span className='text-[12px] md:text-[14px] text-primary_color_1 pr-2'>Airplane</span>

  <select name="roundtrip" defaultValue={"trip"} className='bg-white p-4 text-center text-secoundary_color w-[190px] lg:w-[800px] rounded-2xl text-[12px] md:text-[16px] font-bold border-primary_color border-solid border-b-2 select_option' value={airplane_id} onChange={(e)=>setAirplane_id(e.target.value)}>
                <option value={"trip"} disabled>Select...</option>
                {airplanes?.data?.data?.map((airplane)=>{
                   return <option key={airplane?.airplane_id} value={airplane?.airplane_id}>{airplane?.model}-{airplane?.manufacturer}</option>
                })
                }
                

            </select>
  </div>
 
  <div className="grid md:grid-cols-2 md:gap-6">
  <div className="relative z-0 w-full mb-1 lg:mb-4 group">
      <input type="number" value={flight_number} onChange={(e)=>setFlight_number(e.target.value)}  name="floating_number" id="floating_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Flight number</label>
  </div>
  <div className="relative z-0 w-full mb-1 lg:mb-4 group">
      <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}  name="floating_Price" id="floating_Price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_Price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
  </div>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="text" value={departure_terminal} onChange={(e)=>setDeparture_terminal(e.target.value)}  name="floating_depurture" id="floating_depurture" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_depurture" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Departure terminal</label>
    </div>
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="text" value={arrival_terminal} onChange={(e)=>setArrival_terminal(e.target.value)}  name="floating_arrival" id="floating_arrival" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_arrival" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">arrival terminal</label>
    </div>
  </div>
  <div className="grid md:grid-cols-1 md:gap-6">
   
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="number" value={miles} onChange={(e)=>setMiles(e.target.value)}  name="floating_miles" id="floating_miles" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_miles" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Miles</label>
    </div>
  </div>
 
   
      <div className='flex justify-center items-center my-5'><Button color={"#836E42"}>Submit</Button></div> 
</form>
            </LargeModal>
  )
}

export default Add_Flight