import React, { useEffect, useState} from 'react'
import { activateFlight, Addschedule, AddTimesTospecficDay, deleteFlights, deleteSchedule, deleteSchedule_time, getFlight_info, getFlights, getSchedule, Searchflight, updatespecficDay } from '../../../Redux/ApiSlices/employee/manageFlightsSlice';
import Button from '../../../Components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCalendarDays, faCalendarPlus, faCalendarXmark, faCircleXmark, faClock, faFolderOpen, faPenToSquare, faPersonCirclePlus, faPlaneArrival, faPlaneCircleCheck, faPlaneCircleXmark, faPlaneDeparture, faPlus, faReply, faSquarePlus, faTrashCan, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from '../../../Hooks/usePrevious';
import Pagination from '../../../Components/Pagination/Pagination';
import Headings from '../../../Components/Headings/Headings';
import Loading1 from '../../../Components/Loading/Loading1';
import Loading3 from '../../../Components/Loading/Loading3';
import Add_Flight from './Components/Add_flight';
import Update_flight from './Components/Update_flight';
import Modal from '../../../Components/Modal/Modal';
import { getAirplanes } from '../../../Redux/ApiSlices/employee/ManageAirplanesSlice';
import { getAirports } from '../../../Redux/ApiSlices/employee/airportSlice';
import LargeModal from '../../../Components/Modal/LargeModal';
import DatePicker from 'react-datepicker';
import useDateFormat from '../../../utilities/useDateFormat';
import useTimeFormat from '../../../utilities/useTimeFormat';
import Loading from '../../../Components/Loading/Loading';
import CustomPagination from '../../../Components/Pagination/CustomPagination';



const Manage_flights = () => {
  const dispatch = useDispatch();
  const {flights,isLoading,SearchFlights,error,isLoadingSearch,flight_info,days,isLoadingSchedule}=useSelector((state)=>state.manage_flights);
  const {airplanes}=useSelector(state=>state.airplanes);
    const {All_airports}=useSelector(state=>state.airports);
  const [page,setPage]=useState(1);
  const [search,setSearch]=useState("");
  const prev= usePrevious(search);

  // modal state
  const [open,setOpen]=useState(false);
  const [open1,setOpen1]=useState(false);
  const [open2,setOpen2]=useState(false);
  const [open3,setOpen3]=useState(false);
  const [open4,setOpen4]=useState(false);
  const [open5,setOpen5]=useState(false);
  const [open6,setOpen6]=useState(false);
  const [open7,setOpen7]=useState(false);
  const [open8,setOpen8]=useState(false);
  const [open9,setOpen9]=useState(false);

   
   //  state updating flight
   const [departure_airport,setDeparture_airport]=useState(null);
   const [arrival_airport,setArrival_airport]=useState(null);
   const [airplane_id,setAirplane_id]=useState(null);
   const [flight_number,setFlight_number]=useState(null);
   const [price,setPrice]=useState(null);
   const [departure_terminal,setDeparture_terminal]=useState("");
   const [arrival_terminal,setArrival_terminal]=useState("");
   const [miles,setMiles]=useState(null);
    // helper data
    const [data,setData]=useState(null);

    useEffect(()=>{
        dispatch(getAirplanes())
        dispatch(getAirports())
    },[])

    useEffect(()=>{
        if(window.sessionStorage.getItem("page")){
          let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
          setPage(pageSaved)
        }
        return ()=>{
          if(window.sessionStorage.getItem("page")){
              window.sessionStorage.removeItem("page")
          }
        }
      },[]);

    // while refresh page
    useEffect(()=>{
      dispatch(getFlights(page)).unwrap().then((res)=>{
          window.sessionStorage.setItem("page",JSON.stringify(page))
      }).catch((rej)=>{
          return toast.error(rej?.response?.data?.message);
      })
  },[page]);

  useEffect(()=>{
    const debounce=setTimeout(() => {
        if(prev != search)
        {
            dispatch(Searchflight(search))
        }
    }, 1500);
    return ()=>{
        clearTimeout(debounce)
    }
},[search]);

const handelActiveFlight=(id)=>{
    dispatch(activateFlight(id)).unwrap().then((res)=>{
        setSearch("")
        if(window.sessionStorage.getItem("page")){
            let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
            dispatch(getFlights(pageSaved))
          }
        setOpen5(!open5)
        return toast.success(res?.success)
    }).catch((rej)=>{
        return toast.error(rej?.response?.data?.message)
    })
}

const handelDeleteflight=(id)=>{
    dispatch(deleteFlights(id)).unwrap().then((res)=>{
        setSearch("")
        if(window.sessionStorage.getItem("page")){
            let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
            dispatch(getFlights(pageSaved))
          }
        setOpen1(!open1)
        return toast.success(res?.success)
    }).catch((rej)=>{
        return toast.error(rej?.response?.data?.message)
    })
}
const GetFlight_info=(id)=>{
    dispatch(getFlight_info(id)).unwrap().then((res)=>{
        setAirplane_id(res?.data.airplane.airplane_id);
        setMiles(res?.data.miles);
        setPrice(res?.data.price);
        setFlight_number(res?.data.flight_number);
        setDeparture_terminal(res?.data.departure_terminal);
        setArrival_terminal(res?.data.arrival_terminal);
        setDeparture_airport(res?.data.departure_airport.airport_id)
        setArrival_airport(res?.data.arrival_airport.airport_id)
    })

}

// schedule state
const [departure_date,setDeparture_date]=useState(null);
const [arrival_date,setArrival_date]=useState(null);
const [duration,setDuration]=useState(null);
const [departure_times,setDeparture_times]=useState(null);
const [arrival_times,setArrival_times]=useState(null);

// add schedule
const handelAddSchedule=(id)=>{
    if(departure_date == null){
        return toast.error("Departure date is required")
    }
    if(arrival_date == null){
        return toast.error("Arrival date is required")
    }
    if(duration == null){
        return toast.error("Duration is required")
    }
    if(departure_times == null){
        return toast.error("Departure times is required")
    }
    if(arrival_times == null){
        return toast.error("Arrival time is required") 
    }
    const change=useTimeFormat(departure_times)
    const departure_times_array=[];
    departure_times_array.push(change);


    const arrival_times_array=[];
    let change1=useTimeFormat(arrival_times);
    arrival_times_array?.push(change1);
    
    const data={
        arrival_date:useDateFormat(arrival_date),departure_date:useDateFormat(departure_date),duration,departure_times:departure_times_array,
        arrival_times:arrival_times_array
    }
   
    
   const schedules={
    data,id
   }
   
    dispatch(Addschedule(schedules)).unwrap().then((res)=>{
        setOpen4(!open4);
        setDeparture_date(null);
        setArrival_date(null);
        setDuration(null);
        setDeparture_times(null);
        setArrival_times(null);
        dispatch(getSchedule(id));
        return toast.success(res?.success)
    }).catch((rej)=>{
        return toast.error(rej?.response?.data?.message)
    })
}

        const getSchedule_info=(id)=>{
                dispatch(getSchedule(id))
        }

        
        const handelDeleteDay=(id)=>{
             dispatch(deleteSchedule(id)).unwrap().then((res)=>{
                setOpen6(!open6)
                dispatch(getSchedule(flight_info?.data?.flight_id));
                return toast.success(res?.success);
                }).catch((rej)=>{
        return toast.error(rej?.response?.data?.message)
    })
        }
        const handelUpdateSchedule=(id)=>{
            if(departure_date == null){
                return toast.error("Departure date is required")
            }
            if(arrival_date == null){
                return toast.error("Arrival date is required")
            }
            const data={
                arrival_date:useDateFormat(arrival_date),departure_date:useDateFormat(departure_date)
            }
            const time={data,id}
            dispatch(updatespecficDay(time)).unwrap().then((res)=>{
                setOpen7(!open7);
                setDeparture_date(null);
                setArrival_date(null);
                dispatch(getSchedule(flight_info?.data?.flight_id));
                return toast.success(res?.success)
            }).catch((rej)=>{
                return toast.error(rej?.response?.data?.message)
            })
        }

        const handelAddTimeSpec=(id)=>{
            if(departure_times == null){
                return toast.error("Departure times is required")
            }
            if(arrival_times == null){
                return toast.error("Arrival times is required")
            }
            if(duration == null){
                return toast.error("Duration is required")
            }
            const data={
                departure_time:useTimeFormat(departure_times),arrival_time:useTimeFormat(arrival_times),duration
            }
            const time={data,id}
            dispatch(AddTimesTospecficDay(time)).unwrap().then((res)=>{
                setOpen8(!open8);
                setArrival_times(null);
                setDeparture_times(null);
                setDuration(null);
                dispatch(getSchedule(flight_info?.data?.flight_id));
                return toast.success(res?.success)
            }).catch((rej)=>{
                return toast.error(rej?.response?.data?.message)
            })
        }
        const handelDeleteSceduleTime=(id)=>{
            dispatch(deleteSchedule_time(id)).unwrap().then((res)=>{
               setOpen9(!open9)
               dispatch(getSchedule(flight_info?.data?.flight_id));
               return toast.success(res?.success);
               }).catch((rej)=>{
       return toast.error(rej?.response?.data?.message)
   })
       }
  return  <div className='relative flex flex-col justify-start items-start mt-[78px] lg:mt-[85px] h-auto w-full  lg:w-[calc(100%-296px)] ml-0 sm:ml-auto'>
        
        <Add_Flight open2={open2} setOpen2={setOpen2} airplanes={airplanes} All_airports={All_airports} setSearch={setSearch}/>
        <Update_flight open={open} setOpen={setOpen} airplanes={airplanes} All_airports={All_airports} page={page} departure_airport={departure_airport} arrival_airport={arrival_airport} setDeparture_airport={setDeparture_airport} setArrival_airport={setArrival_airport}
        price={price} setPrice={setPrice} flight_number={flight_number} setFlight_number={setFlight_number} departure_terminal={departure_terminal} setDeparture_terminal={setDeparture_terminal} setSearch={setSearch}
            arrival_terminal={arrival_terminal} setArrival_terminal={setArrival_terminal} miles={miles} setMiles={setMiles} airplane_id={airplane_id} setAirplane_id={setAirplane_id} flight_info={flight_info}
        />
        {/* schedule */}
         <LargeModal open={open3} setOpen={setOpen3}>
            <div className="flex items-center justify-center gap-2 flex-col py-[5px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <Headings element={"h1"}>flight schedule</Headings>

            <div className='flex justify-evenly items-center w-full gap-3 flex-col md:flex-row bg-black/10 py-2'>
                    <div className='flex flex-col items-center justify-center'>
                    <span className='text-[16px] font-semibold text-secoundary_color_1 border-b-4 border-dotted border-primary_color'>flight number</span>
                    <Headings element={"p"} color_P='#000'>{flight_info?.data?.flight_number}</Headings>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                    <span className='text-[16px] font-semibold text-secoundary_color_1 border-b-4 border-dotted border-primary_color'>depurture</span>
                    <Headings element={"p"} color_P='#000'>{flight_info?.data?.arrival_airport.airport_code}</Headings>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                    <span className='text-[16px] font-semibold text-secoundary_color_1 border-b-4 border-dotted border-primary_color'>arrival</span>
                    <Headings element={"p"} color_P='#000'>{flight_info?.data?.departure_airport?.airport_code}</Headings>
                    </div>
                   <div className="relative">
                    <div className="shadow-xl shadow-black_color/40 rounded-xl border-[1px] border-solid border-white/30">
                    <Button onClick={()=>setOpen4(true)}  padding='4px'> <FontAwesomeIcon icon={faPlus} className='text-[20px] font-bold text-primary_color/80 pr-2'/><span className='text-secoundary_color_1 font-semibold'>Add schedule</span></Button>
                    </div>
                   </div>
                   </div>

              {!isLoadingSchedule ?    <div className='flex  justify-center gap-4 items-center  w-full flex-wrap '>
           
           {
             days?.data.length != 0 ?  days?.data?.map(day=>{
               return (
                 <div key={day?.schedule_day_id} className='bg-black/5 basis-[300px] p-1 rounded-xl shadow-black_color shadow-xl relative'>
                  <FontAwesomeIcon icon={faCircleXmark} className='absolute top-[6px]   bg-white p-1 right-[6px] rounded-[50%] text-[17px] sm:text-[20px] cursor-pointer text-red-400 z-40' onClick={()=>{setOpen6(true);setData({id:day?.schedule_day_id,name:new Date(day?.departure_date).toDateString()})}}/>
                  <FontAwesomeIcon icon={faPenToSquare} className='absolute top-[6px]  bg-white p-1 rounded-[50%] right-[35px] text-[17px] cursor-pointer sm:text-[20px] text-secoundary_color/70 z-40' onClick={()=>{setOpen7(true);setData({id:day?.schedule_day_id});setDeparture_date(day?.departure_date);setArrival_date(day?.arrival_date)}}/>
                 <div className="grid md:grid-cols-1 md:gap-6 w-full">
                   <div className="relative z-0 w-full mb-1 lg:mb-4 group text-center ">
                   <p className='font-bold text-white bg-gray_color rounded-xl p-1'>Day</p>

                   </div></div>
                    <div className='flex justify-center items-center flex-col md:flex-row gap-3'>
                  <div className="grid md:grid-cols-1 md:gap-6 w-full bg-white px-2">
                  <div className="relative z-0 w-full mb-1 flex-col group flex items-center justify-between border-b-2 border-dashed border-primary_color">
                  <span className='text-secoundary_color text-[12px] text-nowrap'><FontAwesomeIcon icon={faPlaneDeparture} /> day </span>
                  <p className='text-[12px] text-black_color/60  rounded-xl text-nowrap  p-2'>{new Date(day?.departure_date).toDateString()}</p>

                  </div></div>
                  <div className="grid md:grid-cols-1 md:gap-6 w-full bg-white px-2">
                  <div className="relative z-0 w-full mb-1 flex-col  group flex items-center justify-between border-b-2 border-dashed border-primary_color">
                  <span className='text-secoundary_color text-[12px] text-nowrap'> <FontAwesomeIcon icon={faPlaneArrival}  /> day </span>
                  <p className='text-[12px] text-black_color/60  rounded-xl text-nowrap  p-2'>{new Date(day?.arrival_date).toDateString()}</p>

                  </div></div>
                  </div>

                  
                  <div className="grid md:grid-cols-1 md:gap-6 w-full relative">
                  <FontAwesomeIcon icon={faCalendarPlus} className='absolute  top-[4px] cursor-pointer bg-white p-1 right-[5px] rounded-[50%] text-[17px] sm:text-[20px] text-primary_color/80 z-40'onClick={()=>{setOpen8(true);setData({id:day?.schedule_day_id})}}/>
                   <div className="relative z-0 w-full mb-1 lg:mb-4 text-center group">
                   <p className='font-bold text-white bg-gray_color rounded-xl p-1'>times</p>

                   </div></div>
                 <div className='grid gap-3'>
                 {
                  day?.times.length != 0 ?  day?.times?.map((time)=>{

                    return  <div key={time?.schedule_time_id} className='flex justify-center items-center flex-col md:flex-row gap-1 '>
                             <div className="grid md:grid-cols-1 md:gap-6 w-full bg-white px-2 relative">
                    
                            <div className="relative z-0 w-full mb-1 flex-col  group flex items-center justify-between border-b-2 border-dashed border-primary_color">
                            <span className='text-primary_color text-[12px] text-nowrap'><FontAwesomeIcon icon={faPlaneDeparture} /> time</span>
                            <p className='text-[12px] text-black_color/60  rounded-xl  p-2'>{(time?.departure_time).slice(0,5)}</p>

                            </div>
                            </div>

                            <div className="grid md:grid-cols-1 md:gap-6 w-full bg-white px-2 ">
                            <div className="relative z-0 w-full mb-1 flex-col  group flex items-center justify-between border-b-2 border-dashed border-primary_color">
                            <span className='text-primary_color text-[12px] text-nowrap'> <FontAwesomeIcon icon={faPlaneArrival}  /> time</span>
                            <p className='text-[12px] text-black_color/60  rounded-xl  p-2'>{(time?.arrival_time).slice(0,5)}</p>

                            </div>
                            </div>
                            <div className="grid md:grid-cols-1 md:gap-6 w-full bg-white px-2 ">
                            <div className="relative z-0 w-full mb-1 flex-col  group flex items-center justify-between border-b-2 border-dashed border-primary_color">
                            <span className='text-primary_color text-[12px] text-nowrap'><FontAwesomeIcon icon={faClock} /> duration</span>
                            <p className='text-[12px] text-black_color/60 text-nowrap rounded-xl  p-2'>{(time?.duration).slice(0,2)} hours</p>

                            </div>
                            </div>
                            <div>
                            <div className="relative z-0 w-full   flex items-center justify-between">
                            <span className='text-primary_color text-[12px] text-nowrap'><FontAwesomeIcon icon={faCircleXmark} className='  bg-white p-1 cursor-pointer rounded-[50%] text-[15px] sm:text-[18px] text-red-400 z-40' onClick={()=>{setOpen9(true);setData({id:time?.schedule_time_id,departure:time?.departure_time.slice(0,5)})}}/></span>

                            </div>
                            </div>
                            </div>
                                }): <div className=" w-fit rounded-xl bg-secoundary_color m-auto">
                  <div className="relative z-0 w-full flex-col mb-1 lg:mb-2 group text-center  text-[13px] p-1">
                  <span className='text-white font-bold p-1 text-center '>There are no selected times <FontAwesomeIcon icon={faFolderOpen} className='px-2'/></span>
                  
                  </div></div>
                 }
                 </div>
                 </div>
               )
             }
             
             ): <div className=" w-fit rounded-xl bg-secoundary_color m-auto">
                  <div className="relative z-0 w-full mb-1 lg:mb-4 group text-center  p-3">
                  <span className='text-white font-bold p-4 text-center'>There are no scheduled flights <FontAwesomeIcon icon={faFolderOpen} className='px-2'/></span>
                  
                  </div></div>
           }
           
           <div className='flex gap-3'>
           </div>
          
           </div>:<Loading/>}





            </div>
           </LargeModal>

           {/* add schedule */}
           <Modal open={open4} setOpen={setOpen4}>

            <div className=" flex items-start justify-start gap-2 flex-col py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='border-b-2 border-solid border-primary_color w-fit mx-auto mb-3'>
            <Headings element={"h3"} color='#00529B' >add schedule</Headings>
            </div>

            <div className='flex flex-col justify-center items-center gap-6'>
            <div className='flex items-center gap-3 justify-between   flex-col lg:flex-row'>
           <label className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>Dep date</label>
            <DatePicker
            className={`mt-1 block w-full border-b-2 outline-none text-center font-bold bg-white z-[1000000000000] text-secoundary_color_1 border-primary_color md:text-[16px] focus:border-indigo-500 focus:ring-0 sm:text-sm p-3 rounded-2xl bg-transparent`}
            selected={departure_date} 
            onChange={(date) => setDeparture_date(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="departure_date"
            minDate={new Date()}
            
                 />
            </div>  
            </div>
            <div className='flex flex-col justify-center items-center gap-6'>
            <div className='flex items-center gap-3 justify-between   flex-col lg:flex-row'>
           <label className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>Arr date</label>
            <DatePicker
            className={`mt-1 block w-full border-b-2 outline-none text-center font-bold bg-white z-[1000000000000] text-secoundary_color_1 border-primary_color md:text-[16px] focus:border-indigo-500 focus:ring-0 sm:text-sm p-3 rounded-2xl bg-transparent`}
            selected={arrival_date} 
            onChange={(date) => setArrival_date(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="arrival_date"
            minDate={new Date()}
            
                 />
            </div>
            </div>
           

            <div className='flex flex-col justify-center items-center gap-6'>
            <div className='flex items-center gap-3 justify-between   flex-col lg:flex-row'>
           <label className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>Dep time</label>

           <DatePicker
            className={`mt-1 block w-full border-b-2 outline-none text-center font-bold bg-white z-[1000000000000] text-secoundary_color_1 border-primary_color md:text-[16px] focus:border-indigo-500 focus:ring-0 sm:text-sm p-3 rounded-2xl bg-transparent`}
                selected={departure_times}
                onChange={(date) => setDeparture_times(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                timeCaption="Time"
                dateFormat="HH:mm"
                />
            </div>  
            </div>
            <div className='flex flex-col justify-center items-center gap-6'>
            <div className='flex items-center gap-3 justify-between   flex-col lg:flex-row'>
           <label className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>arr time</label>

           <DatePicker
            className={`mt-1 block w-full border-b-2 outline-none text-center font-bold bg-white z-[1000000000000] text-secoundary_color_1 border-primary_color md:text-[16px] focus:border-indigo-500 focus:ring-0 sm:text-sm p-3 rounded-2xl bg-transparent`}
                selected={arrival_times}
                onChange={(date) => setArrival_times(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                timeCaption="Time"
                dateFormat="HH:mm"
                />
            </div>  
            </div>
            <div className="relative z-0 w-full mb-1 lg:mb-4 group">
            <input type="text" value={duration} onChange={(e)=>setDuration(e.target.value)}  name="floating_number" id="floating_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Duration</label>
            </div>
            <div className='flex gap-3 justify-center items-center w-full'>
            <Button onClick={()=>{handelAddSchedule(flight_info?.data?.flight_id)}} color={"#00529B"} padding='5px'>create</Button>
            </div>


            </div>
           </Modal>
            {/* update day */}
           <Modal open={open7} setOpen={setOpen7}>
            <div className=" flex items-center justify-center gap-3 flex-col py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='border-b-2 border-solid border-primary_color w-fit mx-auto mb-3'>
            <Headings element={"h3"} color='#00529B' >edit day</Headings>
            </div>
            <div className='flex flex-col justify-center items-center gap-6'>
            <div className='flex items-center gap-3 justify-between   flex-col lg:flex-row'>
           <label className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>Dep date</label>
            <DatePicker
            className={`mt-1 block w-full border-b-2 outline-none text-center font-bold bg-white z-[1000000000000] text-secoundary_color_1 border-primary_color md:text-[16px] focus:border-indigo-500 focus:ring-0 sm:text-sm p-3 rounded-2xl bg-transparent`}
            selected={departure_date}
            onChange={(date) => setDeparture_date(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="departure_date"
            minDate={new Date()}
                 />
            </div>  
            </div>
            <div className='flex flex-col justify-center items-center gap-6'>
            <div className='flex items-center gap-3 justify-between   flex-col lg:flex-row'>
           <label className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>Arr date</label>
            <DatePicker
            className={`mt-1 block w-full border-b-2 outline-none text-center font-bold bg-white z-[1000000000000] text-secoundary_color_1 border-primary_color md:text-[16px] focus:border-indigo-500 focus:ring-0 sm:text-sm p-3 rounded-2xl bg-transparent`}
            selected={arrival_date} 
            onChange={(date) => setArrival_date(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="arrival_date"
            minDate={new Date()}
            
                 />
            </div>
            </div>

            
            <div className='flex mt-6 gap-3'>
            <Button onClick={()=>{handelUpdateSchedule(data?.id)}} color={"#00529B"} padding='5px'>update</Button>
            </div>
            </div>
            </Modal>
             {/* add time to specfic day */}
           <Modal open={open8} setOpen={setOpen8}>
            <div className=" flex items-center justify-center gap-2 flex-col py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='border-b-2 border-solid border-primary_color w-fit mx-auto mb-3'>
            <Headings element={"h3"} color='#00529B' >add time</Headings>
            </div>
            <div className='flex flex-col justify-center items-center gap-6'>
            <div className='flex items-center gap-3 justify-between   flex-col lg:flex-row'>
           <label className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>Dep time</label>

           <DatePicker
            className={`mt-1 block w-full border-b-2 outline-none text-center font-bold bg-white z-[1000000000000] text-secoundary_color_1 border-primary_color md:text-[16px] focus:border-indigo-500 focus:ring-0 sm:text-sm p-3 rounded-2xl bg-transparent`}
                selected={departure_times}
                onChange={(date) => setDeparture_times(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                timeCaption="Time"
                dateFormat="HH:mm"
                />
            </div>  
            </div>
            <div className='flex flex-col justify-center items-center gap-6'>
            <div className='flex items-center gap-3 justify-between   flex-col lg:flex-row'>
           <label className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>arr time</label>

           <DatePicker
            className={`mt-1 block w-full border-b-2 outline-none text-center font-bold bg-white z-[1000000000000] text-secoundary_color_1 border-primary_color md:text-[16px] focus:border-indigo-500 focus:ring-0 sm:text-sm p-3 rounded-2xl bg-transparent`}
                selected={arrival_times}
                onChange={(date) => setArrival_times(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                timeCaption="Time"
                dateFormat="HH:mm"
                />
            </div>  
            </div>
            <div className="relative z-0 w-full mb-1 lg:mb-4 group">
            <input type="text" value={duration} onChange={(e)=>setDuration(e.target.value)}  name="floating_number" id="floating_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Duration</label>
            </div>
            <div className='flex gap-3'>
            <Button onClick={()=>{handelAddTimeSpec(data?.id)}} color={"#00529B"} padding='5px'>create</Button>
            </div>

            </div>
            </Modal>
            {/* delete day */}
           <Modal open={open6} setOpen={setOpen6}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to delete <span className='font-extrabold text-secoundary_color/80'>{data?.name}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelDeleteDay(data?.id)} color={"#cf2e2e"} padding='5px'>Delete</Button>
            <Button onClick={()=>setOpen6(!open6)} color={"#777"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
            </Modal>
              {/* delete time */}
           <Modal open={open9} setOpen={setOpen9}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to delete <span className='font-extrabold text-secoundary_color/80'>{data?.departure}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelDeleteSceduleTime(data?.id)} color={"#cf2e2e"} padding='5px'>Delete</Button>
            <Button onClick={()=>setOpen6(!open6)} color={"#777"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
            </Modal>
           {/* delete flight */}
           <Modal open={open1} setOpen={setOpen1}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to delete <span className='font-extrabold text-secoundary_color/80'>{data?.number}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelDeleteflight(data?.id)} color={"#cf2e2e"} padding='5px'>Delete</Button>
            <Button onClick={()=>setOpen1(!open1)} color={"#777"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal>
           {/* activate flight */}
           <Modal open={open5} setOpen={setOpen5}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to activate <span className='font-extrabold text-secoundary_color/80'>{data?.number}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelActiveFlight(data?.id)} color={"#00d084"} padding='5px'>Activation</Button>
            <Button onClick={()=>setOpen5(!open5)} color={"#777"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal>


    
    <div className='h-auto bg-gradient-to-t  p-2 md:p-8 w-full '>
    <div className="flex items-center justify-between flex-column p-4 flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 rounded-t-2xl  bg-black/20">
    <div className='text-left'>
    <Headings element={"h3"}>manage flights</Headings>
    </div>
    <label htmlFor="table-search" className="sr-only">Search</label>
    <div className="relative">
        <div className="shadow-xl shadow-black_color/40 rounded-xl border-[1px] border-solid border-white/30">
        <Button onClick={()=>{setOpen2(true);}}>  <FontAwesomeIcon icon={faPlus}  className='text-[20px] font-bold text-primary_color/80 pr-2'/>Add flights</Button>
        </div>
        
        
    </div>
    <div className="relative">
        <div className="absolute  inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-5 h-5 text-primary_color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="text" id="table-search-users" value={search} onChange={(e)=>setSearch(e.target.value)} className="block p-2 ps-10 text-lg shadow-xl shadow-black_color/40 text-white_color border border-gray-300 rounded-lg w-[180px] sm:w-[200px] lg:w-80 bg-black/5 focus:ring-blue-500 focus:border-blue-500   placeholder:text-secoundary_color dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for flights"/>
    </div>
</div>
    <div className="relative overflow-x-auto   shadow-2xl shadow-black_color/50  lg:rounded-b-lg">
    

<table className="w-full text-sm text-left rtl:text-right text-gray-900 relative">
    <thead className="text-xs text-primary_color uppercase  bg-secoundary_color_1 ">
        <tr>
            
            <th scope="col" className="px-6 py-3">
                Airplane
            </th>
            <th scope="col" className="px-6 py-3">
                Departure airport
            </th>
            <th scope="col" className="px-6 py-3">
                Arrival airport
            </th>
            <th scope="col" className="px-6 py-3">
                Flight details
            </th>
            <th scope="col" className="px-6 py-3">
                Status
            </th>
            <th scope="col" className="px-6 py-3">
                Action
            </th>
        </tr>
    </thead>
    
   
    {search.trim() == "" ? <tbody>
    
    {isLoading ? <tr> <td className=' p-5  rounded-xl z-[99999]  '></td><td className='hidden sm:block p-5  rounded-xl z-[99999]  '></td><td className=' rounded-xl z-[99999] px-6 py-5 text-center align-middle'> 
        <div className="ps-3">
         <div className="text-base ml-12"> 
         <Loading1/>
          </div></div></td></tr>:
        flights?.data?.data?.map((flight)=>{
            return (
                <tr key={flight?.flight_id} className="bg-white_color/80 border-b  border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">
        <th scope="row" className="flex items-center px-6 py-10 text-secoundary_color whitespace-nowrap ">
            <div className="ps-3">
                <div className="text-base font-semibold">{flight?.airplane?.model}</div>
                <div className="font-normal text-gray-500">{flight?.airplane?.manufacturer}</div>
                <div className="font-normal text-gray-500">{flight?.airplane?.range}</div>
            </div>  
        </th>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[14px] text-primary_color_1 cursor-default" title={flight?.departure_airport?.airport_name}> 
          {flight?.departure_airport?.airport_code}
          </div>
          
          
          <div className="font-normal underline text-gray-500 ">{flight?.departure_airport?.country}-{flight?.departure_airport?.city}</div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[14px] text-primary_color_1 cursor-default" title={flight?.arrival_airport?.airport_name}> 
          {flight?.arrival_airport?.airport_code}
          </div>
          
          <div className="font-normal underline text-gray-500 ">{flight?.arrival_airport?.country}-{flight?.arrival_airport?.city}</div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3 text-center">
         <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
          number <span className='text-secoundary_color_1/80 font-semibold'>{flight?.flight_number}</span>
          </div>
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         price <span className='text-secoundary_color_1/80 font-semibold'>{flight?.price}$</span>
          </div>
         
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         miles <span className='text-secoundary_color_1/80 font-semibold'>{flight?.miles}</span>
          </div>
         
          
        </div>
        </td>
       
    
        <td className="px-6 py-2">
            <div className="flex items-center">
            {flight?.deleted_at == null ?<> <div className="h-2.5 w-2.5 rounded-full bg-green-400 me-2"></div> Active</>:<><div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div> Inactive</>}
            </div>
        </td>
        <td className=" text-center  align-middle">
           {
            flight?.deleted_at == null ?<button  onClick={()=>{setOpen1(true);setData({id:flight?.flight_id,number:flight?.flight_number})}} className="font-bold text-[22px] m-2 text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
            <FontAwesomeIcon icon={faTrashCan} />
            </button>:
            <button onClick={()=>{setOpen5(true);setData({id:flight?.flight_id,number:flight?.flight_number})}} className="font-bold text-[22px] text-green_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faReply} />


            </button>
           } 
           {
            flight?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] m-2 text-secoundary_color/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} /></button>:
            <button onClick={()=>{setOpen(true); GetFlight_info(flight?.flight_id)}} className="font-bold text-[20px] text-secoundary_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} />
            </button>
           } 
           {
            flight?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] m-2 text-primary_color/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
            <FontAwesomeIcon icon={faCalendarDays} /></button>:
            <button onClick={()=>{setOpen3(true); GetFlight_info(flight?.flight_id);getSchedule_info(flight?.flight_id)}} className="font-bold text-[20px] text-primary_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faCalendarDays} />
            </button>
           } 
        </td>
    </tr>
            )
        })
    }    
</tbody>:null}

{search.trim() != "" ? <tbody>
    
    {isLoadingSearch ?  <tr> <td className=' p-5  rounded-xl z-[99999]  '></td><td className='hidden sm:block p-5  rounded-xl z-[99999]  '></td><td className=' rounded-xl z-[99999] px-6 py-5 text-center align-middle'> 
        <div className="ps-3">
         <div className="text-base ml-12"> 
         <Loading3/>
          </div></div></td></tr>:
          SearchFlights?.data?.data.length != 0 ? 
           SearchFlights?.data?.data.map((flight)=>{
            return (
                <tr key={flight?.flight_id} className="bg-white_color/80 border-b  border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">
        <th scope="row" className="flex items-center px-6 py-4 text-secoundary_color whitespace-nowrap ">
            <div className="ps-3">
                <div className="text-base font-semibold">{flight?.airplane?.model}</div>
                <div className="font-normal text-gray-500">{flight?.airplane?.manufacturer}</div>
                <div className="font-normal text-gray-500">{flight?.airplane?.range}</div>
            </div>
        </th>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[14px] text-primary_color_1 cursor-default" title={flight?.departure_airport?.airport_name}> 
          {flight?.departure_airport?.airport_code}
          </div>
          
          
          <div className="font-normal underline text-gray-500 ">{flight?.departure_airport?.country}-{flight?.departure_airport?.city}</div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[14px] text-primary_color_1 cursor-default" title={flight?.arrival_airport?.airport_name}> 
          {flight?.arrival_airport?.airport_code}
          </div>
          
          <div className="font-normal underline text-gray-500 ">{flight?.arrival_airport?.country}-{flight?.arrival_airport?.city}</div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3 text-center">
         <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
          number <span className='text-secoundary_color_1/80 font-semibold'>{flight?.flight_number}</span>
          </div>
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         price <span className='text-secoundary_color_1/80 font-semibold'>{flight?.price}$</span>
          </div>
         
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         miles <span className='text-secoundary_color_1/80 font-semibold'>{flight?.miles}</span>
          </div>
         
          
        </div>
        </td>
        <td className="px-6 py-2">
            <div className="flex items-center">
            {flight?.updated_at == null ?<> <div className="h-2.5 w-2.5 rounded-full bg-green-400 me-2"></div> Active</>:<><div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div> Inactive</>}
            </div>
        </td>
        <td className=" text-center  align-middle">
           {
            flight?.deleted_at == null ?<button  onClick={()=>{setOpen1(true);setData({id:flight?.flight_id,number:flight?.flight_number})}} className="font-bold text-[22px] m-2 text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
            <FontAwesomeIcon icon={faTrashCan} />
            </button>:
            <button onClick={()=>{setOpen5(true);setData({id:flight?.flight_id,number:flight?.flight_number})}} className="font-bold text-[22px] text-green_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faReply} />


            </button>
           } 
           {
            flight?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] m-2 text-secoundary_color/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} /></button>:
            <button onClick={()=>{setOpen(true); GetFlight_info(flight?.flight_id)}} className="font-bold text-[20px] text-secoundary_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} />
            </button>
           } 
           {
            flight?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] m-2 text-primary_color/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
            <FontAwesomeIcon icon={faCalendarDays} /></button>:
            <button onClick={()=>{setOpen3(true); GetFlight_info(flight?.flight_id);getSchedule_info(flight?.flight_id)}} className="font-bold text-[20px] text-primary_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faCalendarDays} />
            </button>
           } 
        </td>
    </tr>
            )
        }):<tr> <td className=' p-5  rounded-xl z-[99999]  '></td><td className='hidden sm:block p-5  rounded-xl z-[99999]  '></td><td className=' rounded-xl z-[99999] px-6 py-5 text-center align-middle'> 
        <div className="ps-3">
         <div className="text-base ml-12 flex justify-start items-center my-5 gap-3 shadow-xl shadow-black/60"> 
        <FontAwesomeIcon icon={faBoxOpen} className='text-primary_color text-[25px] sm:text-[35px]'/><span className='text-nowrap text-secoundary_color font-semibold'>No results found</span>
          </div></div></td></tr>
    }    
</tbody>:null}
    
   
    
</table>
<div>
    {
        search.trim() == "" ? <CustomPagination isLoading={isLoading} page={page} setPage={setPage} totalElement={flights?.data?.total} perPage={15}/>:null
    }
       
    </div>
</div>
    </div>
</div>
  
}


export default Manage_flights