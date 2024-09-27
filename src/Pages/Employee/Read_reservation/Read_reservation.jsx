import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Headings from '../../../Components/Headings/Headings';
import Loading1 from '../../../Components/Loading/Loading1';
import CustomPagination from '../../../Components/Pagination/CustomPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faMicrophone, faReply, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { activateReservation, deleteReservation, getReservation, SearchForReservation } from '../../../Redux/ApiSlices/employee/readReservationSlice';
import { usePrevious } from '../../../Hooks/usePrevious';
import Loading3 from '../../../Components/Loading/Loading3';
import Modal from '../../../Components/Modal/Modal';
import Button from '../../../Components/Button/Button';
import { toast } from 'react-toastify';
import SpeachToText from '../../../Components/Voice_Modal/SpeachToText';

const Read_reservation = () => {
    const dispatch = useDispatch();
    const {reservation,isLoading,SearchReservation,error,isLoadingSearch}=useSelector((state)=>state.read_reservation);
    const [page,setPage]=useState(1);
    const [search,setSearch]=useState("");
    const prev= usePrevious(search);

     // modal state
  const [open,setOpen]=useState(false);
  const [open1,setOpen1]=useState(false);
  const [open2,setOpen2]=useState(false);
  const [open5,setOpen5]=useState(false);


   // helper data
   const [data,setData]=useState(null);

   useEffect(()=>{
    if(window.sessionStorage.getItem("page")){
      let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
      setPage(pageSaved)
    }
    return ()=>{
      if(window.sessionStorage.getItem("page")){
          window.sessionStorage.removeItem("page")
      }
      setSearch("")

    }
  },[]);

   // while refresh page
   useEffect(()=>{
    dispatch(getReservation(page)).unwrap().then((res)=>{
        window.sessionStorage.setItem("page",JSON.stringify(page))
    }).catch((rej)=>{
        return toast.error(rej?.response?.data?.message);
    })
},[page]);

useEffect(()=>{
  const debounce=setTimeout(() => {
      if(prev != search)
      {
          dispatch(SearchForReservation(search))
      }
  }, 1500);
  return ()=>{
      clearTimeout(debounce)
  }
},[search]);

const handelActiveReservation=(id)=>{
    dispatch(activateReservation(id)).unwrap().then((res)=>{
        setSearch("")
        if(window.sessionStorage.getItem("page")){
            let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
            dispatch(getReservation(pageSaved))
          }
        setOpen2(!open2)
        return toast.success(res?.data?.message)
    }).catch((rej)=>{
        return toast.error(rej?.response?.data?.message)
    })
}

const handelDeleteReservation=(id)=>{
    dispatch(deleteReservation(id)).unwrap().then((res)=>{
        setSearch("")
        if(window.sessionStorage.getItem("page")){
            let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
            dispatch(getReservation(pageSaved))
          }
        setOpen1(!open1)
        return toast.success(res?.data?.success)
    }).catch((rej)=>{
        return toast.error(rej?.response?.data?.message)
    })
}


  
  return  <div className='relative flex flex-col justify-start items-start mt-[78px] lg:mt-[85px] h-auto w-full  lg:w-[calc(100%-296px)] ml-0 sm:ml-auto'>
        {/* delete reservation */}
          <Modal open={open1} setOpen={setOpen1}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to delete <span className='font-extrabold text-secoundary_color/80'>{data?.number}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelDeleteReservation(data?.id)} color={"#cf2e2e"} padding='5px'>Delete</Button>
            <Button onClick={()=>setOpen1(!open1)} color={"#777"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal>
           {/* activate reservation */}
           <Modal open={open2} setOpen={setOpen2}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to activate <span className='font-extrabold text-secoundary_color/80'>{data?.number}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelActiveReservation(data?.id)} color={"#00d084"} padding='5px'>Activation</Button>
            <Button onClick={()=>setOpen2(!open2)} color={"#777"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal>
           {/* Vice Modal */}
           <SpeachToText open5={open5} setOpen5={setOpen5} search={search} setSearch={setSearch}/>

<div className='h-auto bg-gradient-to-t  p-2 md:p-8 w-full '>
    <div className="flex items-center justify-between flex-column p-4 flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 rounded-t-2xl  bg-black/20">
    <div className='text-left'>
    <Headings element={"h3"}>manage reservation</Headings>
    </div>
    
    <div className="relative flex justify-center items-center">
        <div className="absolute  inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-5 h-5 text-primary_color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="text" id="table-search-users" value={search} onChange={(e)=>setSearch(e.target.value)} className="block p-2 ps-10 text-lg shadow-xl border-r-0 shadow-black_color/40 text-white_color border border-gray-300 rounded-l-lg w-[180px] sm:w-[200px] lg:w-80 bg-black/5 focus:ring-blue-500 focus:border-blue-500   placeholder:text-secoundary_color dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for reservation"/>
            <FontAwesomeIcon icon={faMicrophone} onClick={()=>setOpen5(true)} className='text-white/90  bg-primary_color/70 w-[20px] h-[44.4px]  lg:h-[44px] px-1 shadow-xl rounded-r-lg border-[0.5px] border-l-0 border-gray-300 shadow-black_color/40'/>
    </div>
</div>
    <div className="relative overflow-x-auto   shadow-2xl shadow-black_color/50  lg:rounded-b-lg">
    

<table className="w-full text-sm text-left rtl:text-right text-gray-900 relative">
    <thead className="text-xs text-primary_color uppercase  bg-secoundary_color_1 ">
        <tr>
            
            <th scope="col" className="px-6 py-3">
                Reservation date
            </th>
            <th scope="col" className="px-6 py-3">
                passenger name
            </th>
            <th scope="col" className="px-6 py-3">
                Trip type
            </th>
            <th scope="col" className="px-6 py-3">
                Flight details
            </th>
            <th scope="col" className="px-6 py-3">
                Companions
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
        reservation?.data?.data?.map((reserv)=>{
            return (
                <tr key={reserv?.reservation_id} className="bg-white_color/80 border-b  border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">
        <th scope="row" className="flex items-center px-6 py-12 text-secoundary_color ">
            <div className="ps-4 text-center  align-middle">
                <div className="text-[14px] font-semibold">{new Date(reserv?.created_at).toDateString()}</div>
                
            </div>  
        </th>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[14px] text-primary_color_1 cursor-default text-nowrap">
         {reserv?.passenger?.travel_requirement?.first_name} {reserv?.passenger?.travel_requirement?.last_name}
          </div>  
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[14px] text-primary_color_1 cursor-default text-nowrap"> 
          {reserv?.round_trip == 0 ? "One way":"Round trip"}
          </div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3 text-center">
         <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         number <span className='text-secoundary_color_1/80 font-semibold'>{reserv?.flight?.flight_number}</span>
          </div>
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         price <span className='text-secoundary_color_1/80 font-semibold'>{reserv?.flight?.price}$</span>
          </div>
         
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         miles <span className='text-secoundary_color_1/80 font-semibold'>{reserv?.flight?.miles}</span>
          </div>
         
          
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[14px] text-primary_color_1 cursor-default"> 
          {reserv?.have_companions == 0 ? "No":"Yes"}
          </div>
        </div>
        </td>
        
       
    
        <td className="px-6 py-2">
            <div className="flex items-center">
            {reserv?.status == "Confirmed" ?<> <div className="h-2.5 w-2.5 rounded-full bg-green-400 me-2"></div> Confirmed</>:reserv?.status == "Pending"?<><div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div> Pending</>:<><div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Canceled</>}
            </div>
        </td>
        <td className=" text-center  align-middle">
           {
            reserv?.status != "Pending" &&( reserv?.deleted_at == null ?<button  onClick={()=>{setOpen1(true);setData({id:reserv?.reservation_id,number:reserv?.reservation_date})}} className="font-bold text-[22px] m-2 text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
            <FontAwesomeIcon icon={faTrashCan} />
            </button>:
            <button onClick={()=>{setOpen2(true);setData({id:reserv?.reservation_id,number:reserv?.reservation_date})}} className="font-bold text-[22px] text-green_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faReply} />


            </button>)
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
          SearchReservation?.data?.data?.length != 0 ? 
          SearchReservation?.data?.data?.map((reserv)=>{
            return (
                <tr key={reserv?.reservation_id} className="bg-white_color/80 border-b  border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">
        <th scope="row" className="flex items-center px-6 py-12 text-secoundary_color ">
            <div className="ps-4 text-center  align-middle">
                <div className="text-[14px] font-semibold">{new Date(reserv?.reservation_date).toDateString()}</div>
                
            </div>  
        </th>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[14px] text-primary_color_1 cursor-default text-nowrap">
         {reserv?.passenger?.travel_requirement?.first_name} {reserv?.passenger?.travel_requirement?.last_name}
          </div>  
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[14px] text-primary_color_1 cursor-default text-nowrap"> 
          {reserv?.round_trip == 0 ? "One way":"Round trip"}
          </div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3 text-center">
         <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         number <span className='text-secoundary_color_1/80 font-semibold'>{reserv?.flight?.flight_number}</span>
          </div>
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         price <span className='text-secoundary_color_1/80 font-semibold'>{reserv?.flight?.price}$</span>
          </div>
         
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         miles <span className='text-secoundary_color_1/80 font-semibold'>{reserv?.flight?.miles}</span>
          </div>
         
          
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[14px] text-primary_color_1 cursor-default"> 
          {reserv?.have_companions == 0 ? "No":"yes"}
          </div>
        </div>
        </td>
        
       
    
        <td className="px-6 py-2">
            <div className="flex items-center">
            {reserv?.status == "Confirmed" ?<> <div className="h-2.5 w-2.5 rounded-full bg-green-400 me-2"></div> Confirmed</>:reserv?.status == "Pending"?<><div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div> Pending</>:<><div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Canceled</>}
            </div>
        </td>
        <td className=" text-center  align-middle">
           {
            reserv?.status != "Pending" &&( reserv?.deleted_at == null ?<button  onClick={()=>{setOpen1(true);setData({id:reserv?.reservation_id,number:reserv?.reservation_date})}} className="font-bold text-[22px] m-2 text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
            <FontAwesomeIcon icon={faTrashCan} />
            </button>:
            <button onClick={()=>{setOpen2(true);setData({id:reserv?.reservation_id,number:reserv?.reservation_date})}} className="font-bold text-[22px] text-green_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faReply} />


            </button>)
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
        search.trim() == "" ? <CustomPagination isLoading={isLoading} page={page} setPage={setPage} totalElement={reservation?.data?.pagination?.total} perPage={15}/>:null
    }
       
    </div>
</div>
    </div>

    </div>
  
}

export default Read_reservation