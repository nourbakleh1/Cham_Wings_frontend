import React, { useEffect, useState} from 'react'
import { getFlights } from '../../../Redux/ApiSlices/employee/manageFlightsSlice';
import Button from '../../../Components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from '../../../Hooks/usePrevious';
import Pagination from '../../../Components/Pagination/Pagination';
import Headings from '../../../Components/Headings/Headings';
import Loading1 from '../../../Components/Loading/Loading1';

const Manage_flights = () => {
  const dispatch = useDispatch();
  const {flights,isLoading,error}=useSelector((state)=>state.manage_flights);
  const [page,setPage]=useState(1);
  const [search,setSearch]=useState("");
  const prev= usePrevious(search);


  // modal state
  const [open,setOpen]=useState(false);
  const [open1,setOpen1]=useState(false);
  const [open2,setOpen2]=useState(false);
  const [open3,setOpen3]=useState(false);
  const [open4,setOpen4]=useState(false);
    useEffect(()=>{
      window.scrollTo(0,0);
    },[]);

    // while refresh page
    useEffect(()=>{
      dispatch(getFlights(page)).unwrap().then((res)=>{
          window.sessionStorage.setItem("page",JSON.stringify(page))
      }).catch((rej)=>{
          return toast.error(rej?.response?.data?.message);
      })
  },[page]);
  console.log("fly",flights)
  return  <div className='relative flex flex-col justify-start items-start mt-[78px] lg:mt-[85px] h-auto w-full  lg:w-[calc(100%-296px)] ml-0 sm:ml-auto'>
        

    
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
        <input type="text" id="table-search-users" value={search} onChange={(e)=>setSearch(e.target.value)} className="block p-2 ps-10 text-lg shadow-xl shadow-black_color/40 text-white_color border border-gray-300 rounded-lg w-[180px] sm:w-[200px] lg:w-80 bg-black/5 focus:ring-blue-500 focus:border-blue-500   placeholder:text-secoundary_color dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for employees"/>
    </div>
</div>
    <div className="relative overflow-x-auto   shadow-2xl shadow-black_color/50  lg:rounded-b-lg">
    

<table className="w-full text-sm text-left rtl:text-right text-gray-900 relative">
    <thead className="text-xs text-primary_color uppercase  bg-secoundary_color_1 ">
        <tr>
            
            <th scope="col" className="px-6 py-3">
                Name
            </th>
            <th scope="col" className="px-6 py-3">
                Position
            </th>
            <th scope="col" className="px-6 py-3">
                Status
            </th>
            <th scope="col" className="px-6 py-3">
                Action
            </th>
        </tr>
    </thead>
    
   
        <tbody>
    
    {isLoading ?  <div className='absolute bottom-[10%] left-[50%] translate-x-[-50%]'><Loading1/></div>:
        flights?.data?.data.map((flight)=>{
            return (
                <tr key={flight?.employee_id} className="bg-white_color/80 border-b  border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">
        <th scope="row" className="flex items-center px-6 py-4 text-secoundary_color whitespace-nowrap ">
            <div className="ps-3">
                <div className="text-base font-semibold">{flight?.flight_number}</div>
                <div className="font-normal text-gray-500">{flight?.number_of_reserved_seats}</div>
            </div>  
        </th>
        <td className="px-6 py-2">
            {flight?.price}
        </td>
        <td className="px-6 py-2">
            <div className="flex items-center">
            {/* {flight?.price == null ?<> <div className="h-2.5 w-2.5 rounded-full bg-green-400 me-2"></div> Active</>:<><div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div> Inactive</>} */}
            </div>
        </td>
        {/* <td className=" py-9 flex justify-evenly items-center">
           {
            employee?.deleted_at == null ?<button disabled={employee?.roles[0]?.role_id == 4} onClick={()=>{setOpen1(true);setData({"id": employee?.employee_id,"name":employee?.name})}} className="font-bold text-[20px] text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
            <FontAwesomeIcon icon={faUserXmark} />
            </button>:
            <button onClick={()=>{setOpen3(true);setData({"id": employee?.employee_id,"name":employee?.name})}} className="font-bold text-[28px] text-green_color/80    hover:underline">
            <FontAwesomeIcon icon={faPersonCirclePlus} />
            </button>
           } 
           {
            employee?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] text-secoundary_color/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
            <FontAwesomeIcon icon={faUserPen} /></button>:
            <button onClick={()=>{setOpen(true);getEmp_info(employee?.employee_id);}} className="font-bold text-[20px] text-secoundary_color/80   hover:underline">
            <FontAwesomeIcon icon={faUserPen} />
            </button>
           } 
        </td> */}
    </tr>
            )
        })
    }    
</tbody>
    
   
    
</table>
<div>
    {
        search.trim() == "" ? <Pagination page={page} setPage={setPage} totalElement={flights?.data?.total} perPage={15}/>:null
    }
       
    </div>
</div>
    </div>
</div>
  
}


export default Manage_flights