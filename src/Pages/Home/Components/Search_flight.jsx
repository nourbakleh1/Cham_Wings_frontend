import { faArrowRightArrowLeft, faCalendarDays, faPlane, faPlaneArrival, faPlaneDeparture, faSliders } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Button from '../../../Components/Button/Button'
import { airport } from '../../../dummy_data'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Responsibilty.css"
import { useDispatch, useSelector } from 'react-redux'
import { searchFlights } from '../../../Redux/ApiSlices/flightSlice'
import useDateFormat from '../../../utilities/useDateFormat'
import { toast } from 'react-toastify'
import { getAirports } from '../../../Redux/ApiSlices/employee/airportSlice'
import { useNavigate } from 'react-router-dom'

const Search_flight = () => {
    const dispatch=useDispatch();
    const{All_airports}=useSelector(state=>state.airports);
    const navigate=useNavigate()
    
  
    // state 
    const [startDate, setStartDate] = useState(new Date());
    const [startDate_return, setStartDate_return] = useState(new Date());
    const [booking_preference,setBooking_preference]=useState(null);
    const[trip_type,setTrip_type]=useState(null);
    const [adults,setAdults]=useState(null);
    const [infants,setInfants]=useState(null);
    const [departure_airport,setDeparture_airport]=useState(null);
    const [arrival_airport,setArrival_airport]=useState(null);

    useEffect(()=>{
        dispatch(getAirports())
    },[]);
    const handelSearch=(e)=>{
        e.preventDefault();
        if(trip_type == null){
            return toast.error("Trip type is required")
        }
        if(booking_preference == null){
            return toast.error("Booking preference is required")
        }
       
        if(booking_preference != "b"){
            if(adults == null){
                return toast.error("Adults is required")
            }
            if(infants == null){
                return toast.error("Infants is required")
            }
        }
        if(departure_airport == null){
            return toast.error("Departure airport is required")
        }
        if(arrival_airport == null){
            return toast.error("Arrival airport  is required")
        }
        

        const data={
            trip_type:parseInt(trip_type),booking_preference,departure_airport:parseInt(departure_airport),arrival_airport:parseInt(arrival_airport),departure_date:useDateFormat(startDate)
        }
        if(booking_preference != "b"){
            data.adults=parseInt(adults);
            data.infants=parseInt(infants)
        }
        if(trip_type == 1){
            data.return_date=useDateFormat(startDate_return)
        }
        console.log("data",data)
        dispatch((searchFlights(data))).unwrap().then((res)=>{
            navigate('/flight');
        }).catch((rej)=>{
            return toast.error(rej?.response?.data?.message)
        })
    }

  return (
    <div className='Rota'>
    <form onSubmit={handelSearch}>
    <section className='h-[930px] opacity-95 lg:h-[400px] xl:h-[370px] w-full sm:w-[550px] md:w-[650px] lg:w-[970px] xl:w-[1200px] p-5 bg-off_white m-auto flex flex-col gap-5 z-[50000000] justify-around translate-y-[-100px]  xl:translate-y-[-160px] shadow-black_color/50 shadow-xl '>
        <div className='border-solid border-b-2 bg-white/50 border-primary_color flex justify-center items-center p-2 rounded-sm '>
        <FontAwesomeIcon icon={faPlane} className='text-secoundary_color px-3 text-[20px] '/>
            <span className='font-bold'>Flights</span>
        </div>

            <div className='flex justify-evenly items-center gap-5  flex-col lg:flex-row'>

            <div className=' flex justify-evenly items-center w-full md:mb-0 mb-[20px] flex-col bg-secoundary_color/15 p-2 Rota'>
            <div className='flex justify-center items-center flex-col  gap-2'>
                <span className='text-[12px] md:text-[16px] text-primary_color_1   pr-2'>Trip type</span>
                <select name="roundtrip" defaultValue={"trip"} className='bg-white p-4 text-center text-secoundary_color w-[200px] lg:w-[250px] rounded-2xl text-[12px] md:text-[16px] font-bold border-primary_color border-solid border-b-2 select_option' value={trip_type} onChange={(e)=>setTrip_type(e.target.value)}>
                <option value={"trip"} disabled>Select...</option>
                <option value={0}>One way</option>
                <option value={1}>Round trip</option>

            </select>
            </div>
           

            <div className='flex justify-center items-center flex-col  gap-2'>
            <span className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>Select booking preference</span>
            <select name="roundtrip"  defaultValue={"prefrence"} className='bg-white p-4 text-secoundary_color text-center w-[200px] lg:w-[250px] rounded-2xl  text-[12px] md:text-[16px] font-bold border-primary_color border-solid border-b-2 select_option' value={booking_preference} onChange={(e)=>setBooking_preference(e.target.value)}>
                <option value="prefrence" disabled>Select...</option>
                <option value="a">For me and companions</option>
                <option value="b">For me</option>
                <option value="c">For others only</option>

            </select>

            </div>
            </div>   

        <div className=' flex justify-evenly items-center w-full md:mb-0 mb-[20px] flex-col bg-secoundary_color/10 p-2 Rota'>
            <div className='flex justify-center items-center flex-col  gap-2'>

        
        <div className='flex justify-center items-center flex-col  gap-2'>
           <span className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>departure airport</span>
            <select name="departure_airport" defaultValue={"from"} className='bg-white p-4 text-center text-secoundary_color w-[200px] lg:w-[250px] rounded-2xl text-[12px] md:text-[16px] font-bold border-primary_color border-solid border-b-2 select_option' value={departure_airport} onChange={(e)=>setDeparture_airport(e.target.value)}>
                <option value="from" disabled>from</option>
                    {
                        All_airports?.data?.map((el)=>{
                            return <option key={el?.airport_id} value={el?.airport_id}>{el?.airport_code}({el?.airport_name})</option>
                        })
                    }
            </select>
            </div>
            <div className='flex justify-center items-center flex-col gap-2'>
            <span className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>arrival airport</span>
            <select name="arrival_airport" defaultValue={"to"} className='bg-white p-4 text-center text-secoundary_color w-[200px] lg:w-[250px] rounded-2xl text-[12px] md:text-[16px] font-bold border-primary_color border-solid border-b-2 select_option' value={arrival_airport} onChange={(e)=>setArrival_airport(e.target.value)}>
                <option value="to"  disabled>to</option>
                {
                    All_airports?.data?.map((el)=>{
                            return <option key={el?.airport_id} value={el?.airport_id}>{el?.airport_code}({el?.airport_name})</option>
                        })
                    }
            </select>
            </div>
            </div>
            
           
           
            </div>

                    {/*  */}
                    <div className=' flex justify-evenly items-center w-full md:mb-0 mb-[20px] flex-col bg-primary_color/15 p-2  Rota'>
                    <div className='flex justify-center items-center flex-col  gap-2'>
                    <div className='flex justify-center items-center flex-col  gap-2'>
            <span className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>Adults</span>
            <select defaultValue={"adults"} className='bg-white p-4 text-center text-secoundary_color w-[200px] lg:w-[250px] rounded-2xl text-[12px] md:text-[16px] font-bold border-primary_color border-solid border-b-2 select_option' disabled={booking_preference == "b"} value={adults} onChange={(e)=>setAdults(e.target.value)}>
                    <option value="adults" disabled>Select...</option>
                    
                  {
                    booking_preference == "a" ? null:<option value={1}>1</option>
                  }  
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>

                </select>
            </div>
                <div className='flex justify-center items-center flex-col  gap-2'>
            <span className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>Infants</span>
            <select defaultValue={"infants"} className='bg-white p-4 text-center text-secoundary_color w-[200px] lg:w-[250px] rounded-2xl text-[12px] md:text-[16px] font-bold border-primary_color border-solid border-b-2 select_option' disabled={booking_preference == "b"} value={infants} onChange={(e)=>setInfants(e.target.value)}>
                    <option value="infants" disabled>Select...</option>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                </select>
                </div>  




            </div>
            </div>  
            <div className=' flex justify-evenly items-center w-full md:mb-0 mb-[20px] flex-col bg-primary_color/10 p-2 Rota'>
            
            <div className='flex justify-center gap-4 items-center  flex-col lg:flex-row'> 
       <div className='flex items-center gap-3 justify-between   flex-col '>
       <label className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>Departure</label>
        <DatePicker
        className={`mt-1 block w-full border-b-2 outline-none text-center font-bold bg-white z-[1000000000000] text-secoundary_color_1 border-primary_color md:text-[16px] focus:border-indigo-500 focus:ring-0 sm:text-sm p-3 rounded-2xl bg-transparent`}
        selected={startDate} 
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="departure_time"
        minDate={new Date()}
        maxDate={`${startDate?.getFullYear()+1}-${startDate?.getMonth()}-${startDate?.getDate()}`}
        
        
             />
            
       {
        trip_type =="1" ?
        <>
        <label className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>Return</label>
        <DatePicker
        className={`mt-1 block w-full border-b-2 text-center outline-none font-bold bg-white z-[1000000000000] text-secoundary_color_1 md:text-[16px] border-primary_color focus:border-indigo-500 focus:ring-0 sm:text-sm p-3 rounded-2xl bg-transparent`}
        selected={startDate_return} 
        onChange={(date) => setStartDate_return(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="arrival_time"
        minDate={startDate}
        maxDate={`${startDate?.getFullYear()+1}-${startDate?.getMonth()}-${startDate?.getDate()}`}
        
             /></>:null
       } 
        </div>
       </div>  
      
        </div>
            </div>  

            <div className='m-auto'>
       <Button color={"#AE8A3B"} padding='15px 80px'>Search</Button>

       </div>






           

           


            

    </section>
    </form></div>
  )
}

export default Search_flight