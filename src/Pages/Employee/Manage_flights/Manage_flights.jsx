import React, { useEffect, useState} from 'react'
import { deleteFlights, getFlight_info, getFlights, Searchflight } from '../../../Redux/ApiSlices/employee/manageFlightsSlice';
import Button from '../../../Components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPersonCirclePlus, faPlaneCircleCheck, faPlaneCircleXmark, faTrashCan, faUserPen, faUserPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons';
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
import { getAirports } from '../../../Redux/ApiSlices/airportSlice';


const Manage_flights = () => {
  const dispatch = useDispatch();
  const {flights,isLoading,SearchFlights,error,isLoadingSearch,flight_info}=useSelector((state)=>state.manage_flights);
  const {airplanes}=useSelector(state=>state.airplanes);
    const {All_airports}=useSelector(state=>state.airports);
  const [page,setPage]=useState(-1);
  const [search,setSearch]=useState("");
  const prev= usePrevious(search);

  // modal state
  const [open,setOpen]=useState(false);
  const [open1,setOpen1]=useState(false);
  const [open2,setOpen2]=useState(false);
  const [open3,setOpen3]=useState(false);
  const [open4,setOpen4]=useState(false);

   
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

// const handelActiveFlight=(id)=>{
//     dispatch(deleteFlights(id)).unwrap().then((res)=>{
//         setSearch("")
//         if(window.sessionStorage.getItem("page")){
//             let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
//             dispatch(getEmployees(pageSaved))
//           }
//         setOpen1(!open1)
//         return toast.success(res?.success)
//     }).catch((rej)=>{
//         return toast.error(rej?.response?.data?.message)
//     })
// }

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


  return  <div className='relative flex flex-col justify-start items-start mt-[78px] lg:mt-[85px] h-auto w-full  lg:w-[calc(100%-296px)] ml-0 sm:ml-auto'>
        
        <Add_Flight open2={open2} setOpen2={setOpen2} airplanes={airplanes} All_airports={All_airports}/>
        <Update_flight open={open} setOpen={setOpen} airplanes={airplanes} All_airports={All_airports} page={page} departure_airport={departure_airport} arrival_airport={arrival_airport} setDeparture_airport={setDeparture_airport} setArrival_airport={setArrival_airport}
        price={price} setPrice={setPrice} flight_number={flight_number} setFlight_number={setFlight_number} departure_terminal={departure_terminal} setDeparture_terminal={setDeparture_terminal}
            arrival_terminal={arrival_terminal} setArrival_terminal={setArrival_terminal} miles={miles} setMiles={setMiles} airplane_id={airplane_id} setAirplane_id={setAirplane_id} flight_info={flight_info}
        />
         {/* <Modal open={open3} setOpen={setOpen3}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to activate <span className='font-extrabold text-secoundary_color/80'>{data?.number}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelActiveFlight(data?.id)} color={"#00d084"} padding='5px'>Activation</Button>
            <Button onClick={()=>setOpen3(!open3)} color={"#cf2e2e"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal> */}
           <Modal open={open1} setOpen={setOpen1}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to delete <span className='font-extrabold text-secoundary_color/80'>{data?.number}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelDeleteflight(data?.id)} color={"#00529B"} padding='5px'>Delete</Button>
            <Button onClick={()=>setOpen1(!open1)} color={"#cf2e2e"} padding='5px'>Cancel</Button>
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
        <Button onClick={()=>{setOpen2(true);}}> <FontAwesomeIcon icon={faUserPlus} className='text-[20px] font-bold text-primary_color/80 pr-2'/>Add flights</Button>
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
         <div className="text-base text-primary_color_1"> 
          {flight?.departure_airport?.airport_code}
          </div>
          <div className="text-base text-black_color"> 
          {flight?.departure_airport?.airport_name}
          </div>
          
          <div className="font-normal underline text-gray-500 ">{flight?.departure_airport?.country}-{flight?.departure_airport?.city}</div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-base text-primary_color_1"> 
          {flight?.arrival_airport?.airport_code}
          </div>
          <div className="text-base text-black_color text-[11px]"> 
          {flight?.arrival_airport?.airport_name}
          </div>
          <div className="font-normal underline text-gray-500 ">{flight?.arrival_airport?.country}-{flight?.arrival_airport?.city}</div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-base text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg bg-black/5"> 
          number : {flight?.flight_number}
          </div>
          <div className="text-base text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg bg-black/5"> 
         price : {flight?.price}$
          </div>
         
          <div className="text-base text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg bg-black/5"> 
         miles : {flight?.miles}
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
            <button onClick={()=>{setOpen3(true);setData({id:flight?.flight_id,number:flight?.flight_number})}} className="font-bold text-[22px] text-green_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faPlaneCircleCheck} />

            </button>
           } 
           {
            flight?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] m-2 text-secoundary_color/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} /></button>:
            <button onClick={()=>{setOpen(true); GetFlight_info(flight?.flight_id)}} className="font-bold text-[20px] text-secoundary_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} />
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
         <div className="text-base text-primary_color_1"> 
          {flight?.departure_airport?.airport_code}
          </div>
          <div className="text-base text-black_color"> 
          {flight?.departure_airport?.airport_name}
          </div>
          
          <div className="font-normal underline text-gray-500 ">{flight?.departure_airport?.country}-{flight?.departure_airport?.city}</div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-base text-primary_color_1"> 
          {flight?.arrival_airport?.airport_code}
          </div>
          <div className="text-base text-black_color"> 
          {flight?.arrival_airport?.airport_name}
          </div>
          
          
          <div className="font-normal underline text-gray-500 ">{flight?.arrival_airport?.country}-{flight?.arrival_airport?.city}</div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-base text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg bg-black/5"> 
          number : {flight?.flight_number}
          </div>
          <div className="text-base text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg bg-black/5"> 
         price : {flight?.price}$
          </div>
         
          <div className="text-base text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg bg-black/5"> 
         miles : {flight?.miles}
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
            flight?.deleted_at == null ?<button  onClick={()=>{setOpen1(true);}} className="font-bold text-[22px] m-2 text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
            <FontAwesomeIcon icon={faTrashCan} />
            </button>:
            <button onClick={()=>{setOpen3(true);setData({})}} className="font-bold text-[22px] text-green_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faPlaneCircleCheck} />
            </button>
           } 
           {
            flight?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] m-2 text-secoundary_color/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} /></button>:
            <button onClick={()=>{setOpen(true);}} className="font-bold text-[20px] text-secoundary_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} />
            </button>
           } 
        </td>
    </tr>
            )
        })
    }    
</tbody>:null}
    
   
    
</table>
<div>
    {
        search.trim() == "" ? <Pagination page={window.sessionStorage.getItem("page") && JSON.parse(window.sessionStorage.getItem("page"))} setPage={setPage} totalElement={flights?.data?.total} perPage={15}/>:null
    }
       
    </div>
</div>
    </div>
</div>
  
}


export default Manage_flights