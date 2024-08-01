import { faArrowRightArrowLeft, faCalendarDays, faPlane, faPlaneArrival, faPlaneDeparture, faSliders } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Button from '../../../Components/Button/Button'
import { airport } from '../../../dummy_data'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Search_flight = () => {
    const [displayReturn,setDisplayReturn]=useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [startDate_return, setStartDate_return] = useState(new Date());

  return (
    <form>
    <section className='h-[670px] sm:h-[420px] xl:h-[250px] w-full sm:w-[550px] md:w-[650px] lg:w-[970px] xl:w-[1150px] bg-off_white m-auto flex flex-col gap-5 z-[50000000] justify-around translate-y-[-100px] '>
        <div className='border-solid border-b-2 border-primary_color flex justify-center items-center' >
        <FontAwesomeIcon icon={faPlane} className='text-secoundary_color px-3 text-[20px]'/>
            <span className='font-bold'>Flights</span>
        </div>
            <div className='flex justify-evenly items-center w-full mb-[20px] flex-col sm:flex-row'>
            <div className='flex flex-col md:flex-row items-center'>
                <span className='text-[12px] text-primary_color_1  pr-2'>Trip type</span>
                <select name="roundtrip" className='bg-white p-2 text-secoundary_color w-[200px] lg:w-[250px]  text-[12px] font-bold border-primary_color border-solid border-b-2' onChange={()=>setDisplayReturn(!displayReturn)}>
                <option value="0">round trip</option>
                <option value="1">one way</option>
            </select>
            </div>
           

            <div className='flex flex-col md:flex-row items-center'>
            <span className='text-[12px] text-primary_color_1  pr-2'>Select booking preference</span>
            <select name="roundtrip" className='bg-white p-2 text-secoundary_color w-[200px] lg:w-[250px]  text-[12px] font-bold border-primary_color border-solid border-b-2' onChange={()=>setDisplayReturn(!displayReturn)}>
                <option value="0">For me and companions</option>
                <option value="1">For others only</option>
            </select>

            </div>
            </div>
            
            <div className='flex justify-evenly items-center gap-5 p-3 flex-col sm:flex-row'>
            
            <div>
            <span className='text-[12px] text-primary_color_1 _color pr-2'>class</span>
            <select className='bg-white text-secoundary_color w-[150px] p-2 sm:w-[100px] lg:w-[150px] text-[12px] font-bold border-primary_color border-solid border-b-2' >
                    <option value="economy">economy class</option>
                    <option value="business">business class</option>
                </select>
            </div>
            <div>
            <span className='text-[12px] text-primary_color_1  pr-2'>adults</span>
            <select className='bg-white text-secoundary_color p-2 w-[150px] sm:w-[100px] lg:w-[150px] text-[12px] font-bold border-primary_color border-solid border-b-2'>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>

                </select>
            </div>
                <div>
            <span className='text-[12px] text-primary_color_1  pr-2'>infants</span>
            <select className='bg-white text-secoundary_color p-2 w-[150px] sm:w-[100px] lg:w-[150px] text-[12px] font-bold border-primary_color border-solid border-b-2'>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
                </div>    
            </div>
            

        <div className='flex justify-evenly items-center gap-5 flex-col lg:flex-row p-2'>
        <div className='flex justify-center gap-4 items-center flex-col sm:flex-row'>

        
        <div className='flex items-center'>
            <FontAwesomeIcon icon={faPlaneDeparture} className='px-2 text-[20px] text-secoundary_color'/>
            <select name="departure_airport" className='bg-white text-secoundary_color w-[180px] py-2 sm:w-[100px] lg:w-[200px] text-[12px] font-bold border-primary_color border-solid border-b-2'>
                <option value="" disabled>from</option>
                    {
                        airport?.map((el)=>{
                            return <option key={el.airport_code} value={el.airport_code}>{el.airport_name}({el.airport_code})</option>
                        })
                    }
            </select>
            </div>
            <FontAwesomeIcon icon={faArrowRightArrowLeft} className='text-primary_color_1'/>
            <div className='flex items-center'>
            <FontAwesomeIcon icon={faPlaneArrival} className='px-2 text-[20px] text-secoundary_color' />
            <select name="arrival_airport" className='bg-white text-secoundary_color w-[180px] py-2 sm:w-[100px] text-[12px] lg:w-[200px] xl font-bold border-primary_color border-solid border-b-2'>
                <option value=""  disabled>to</option>
                {
                        airport?.map((el)=>{
                            return <option key={el.airport_code} value={el.airport_code}>{el.airport_name}({el.airport_code})</option>
                        })
                    }
            </select>
            </div>
            </div>
            
           <div className='flex justify-center gap-4 items-center  flex-col lg:flex-row'> 
           <div className='flex items-center gap-3 justify-between   flex-col lg:flex-row'>
            <DatePicker
            className={`mt-1 block w-full border-b-2 outline-none bg-white z-[1000000000000] border-primary_color focus:border-indigo-500 focus:ring-0 sm:text-sm p-1 bg-transparent`}
            selected={startDate} 
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="departure_time"
            minDate={new Date()}
            maxDate={`${startDate.getFullYear()+1}-${startDate.getMonth()}-${startDate.getDate()}`}
            
            
                 />
                
           {
            displayReturn &&
            <DatePicker
            className={`mt-1 block w-full border-b-2 outline-none bg-white z-[1000000000000] border-primary_color focus:border-indigo-500 focus:ring-0 sm:text-sm p-1 bg-transparent`}
            selected={startDate_return} 
            onChange={(date) => setStartDate_return(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="arrival_time"
            minDate={startDate}
            maxDate={`${startDate.getFullYear()+1}-${startDate.getMonth()}-${startDate.getDate()}`}
                 />
           } 
            </div>
            <Button color={"#AE8A3B"} padding='5px'>Search</Button>
           </div>


            </div>
    </section>
    </form>
  )
}

export default Search_flight