import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from '../../../Hooks/usePrevious';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import Headings from '../../../Components/Headings/Headings';
import CustomPagination from '../../../Components/Pagination/CustomPagination';
import { getLogs, getLogs_search } from '../../../Redux/ApiSlices/admin/adminSlice';
import Loading1 from '../../../Components/Loading/Loading1';
import { toast } from 'react-toastify';
import Loading3 from '../../../Components/Loading/Loading3';
import SpeachToText from '../../../Components/Voice_Modal/SpeachToText';

const View_history = () => {
  const dispatch = useDispatch();
  const {logs,isLoading,logs_Search,isLoading_search}=useSelector((state)=>state.admin);
  const [page,setPage]=useState(1);
  const [search,setSearch]=useState("");
  const prev= usePrevious(search);
  const [open5,setOpen5]=useState(false);

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

  useEffect(()=>{
    const debounce=setTimeout(() => {
        if(prev != search)
        {
            dispatch(getLogs_search(search))
        }
    }, 1500);
    return ()=>{
        clearTimeout(debounce)
    }
},[search]);

// while refresh page
useEffect(()=>{
  dispatch(getLogs(page)).unwrap().then((res)=>{
      window.sessionStorage.setItem("page",JSON.stringify(page))
  }).catch((rej)=>{
      return toast.error(rej?.response?.data?.message);
  })
},[page]);

  return (
    <div className='relative flex flex-col justify-start items-start mt-[78px] lg:mt-[85px] h-auto w-full  lg:w-[calc(100%-296px)] ml-0 sm:ml-auto'>
     {/* Vice Modal */}
     <SpeachToText open5={open5} setOpen5={setOpen5} search={search} setSearch={setSearch}/>
   <div className='h-auto bg-gradient-to-t  p-2 md:p-8 w-full '>
   <div className="flex items-center justify-between flex-column rounded-t-2xl p-4 flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4  bg-black/20">
        <div className='text-left'>
        <Headings element={"h3"}>activities log</Headings>
        </div>
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative flex justify-center items-center">
            <div className="absolute  inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-5 h-5 text-primary_color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="table-search-users" value={search} onChange={(e)=>setSearch(e.target.value)} className="block p-2 ps-10 text-lg shadow-xl border-r-0 shadow-black_color/40 text-white_color border border-gray-300 rounded-l-lg w-[180px] sm:w-[200px] lg:w-80 bg-black/5 focus:ring-blue-500 focus:border-blue-500   placeholder:text-secoundary_color dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for log"/>
            <FontAwesomeIcon icon={faMicrophone} onClick={()=>setOpen5(true)}  className='text-white/90  bg-primary_color/70 w-[20px] h-[44.4px]  lg:h-[44px] px-1 shadow-xl rounded-r-lg border-[0.5px] border-l-0 border-gray-300 shadow-black_color/40'/>
        </div>
        </div>
        <div className="relative overflow-x-auto   shadow-2xl shadow-black_color/50  lg:rounded-b-lg">

        <table class="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
        <thead class="text-xs text-black/50 uppercase bg-black_color/40 border-b border-blue-400 ">
            <tr>
                <th scope="col" class="px-6 py-3 text-wrap">
                    Message
                </th>
                <th scope="col" class="px-6 py-3 text-nowrap">
                    Created at
                </th>
                <th scope="col" class="px-6 py-3 text-nowrap">
                    Updated at
                </th>
                <th scope="col" class="px-6 py-3 ">
                    Event
                </th>
               
            </tr>
        </thead>
        {search.trim() == ""  ?
        <tbody>
        {isLoading ?  <tr> <td className=' p-5  rounded-xl z-[99999]  '></td><td className='hidden sm:block p-5  rounded-xl z-[99999]  '></td><td className='  p-5  rounded-xl z-[99999]  '><Loading1/></td></tr>:
          logs?.data?.data?.map((log)=>{
            return (
              <tr className="bg-secoundary_color_1/50 border-b border-blue-400" key={log?.log_id}>
                <th scope="row" className="px-6 py-4 font-bold  text-white/80 leading-6 ">
                    {log?.message}
                </th>
                <td className="px-6 py-4 font-bold leading-6 text-white/80">
                    {new Date(log?.created_at).toLocaleString()}
                </td>
               
                <td className="px-6 py-4 font-bold leading-6 text-white/80">
                    {new Date(log?.updated_at).toLocaleString()}
                </td>
                <td className={`px-6 py-4  font-bold text-white/80 ${log?.type == "update" ? "bg-secoundary_color/40":log?.type == "delete" ? "bg-red_color/40":"bg-green_color/40"}`}>
                    {log?.type}
                </td>
            </tr>
            )
          })

          }
            
            
        </tbody>:null}
        {search.trim() != 0  ?
            <tbody>
        
        {isLoading_search ? <tr> <td className=' p-5   rounded-xl z-[99999]  '></td><td className='hidden sm:block p-5  rounded-xl z-[99999]  '></td><td className='  p-5  rounded-xl z-[99999]  '><Loading3/></td></tr>:
            logs_Search?.data?.data.length != 0 ?logs_Search?.data?.data?.map((log)=>{
            return (
              <tr className="bg-secoundary_color_1/50 border-b border-blue-400" key={log?.log_id}>
                <th scope="row" className="px-6 py-4 font-bold  text-white/80 leading-6 ">
                    {log?.message}
                </th>
                <td className="px-6 py-4 font-bold leading-6 text-white/80">
                    {new Date(log?.created_at).toLocaleString()}
                </td>
               
                <td className="px-6 py-4 font-bold leading-6 text-white/80">
                    {new Date(log?.updated_at).toLocaleString()}
                </td>
                <td className={`px-6 py-4  font-bold text-white/80 ${log?.type == "update" ? "bg-secoundary_color/40":log?.type == "delete" ? "bg-red_color/40":"bg-green_color/40"}`}>
                    {log?.type}
                </td>
            </tr>
            )
          }):<tr> <td className=' p-1  rounded-xl z-[99999]  '></td><td className='hidden sm:block p-5  rounded-xl z-[99999]  '></td><td className=' rounded-xl z-[99999] px-6 py-5 text-center align-middle'> 
        <div className="">
         <div className="text-base  flex justify-start items-start  my-5 shadow-xl shadow-black/60 w-fit p-2"> 
        <FontAwesomeIcon icon={faBoxOpen} className='text-primary_color text-[25px] sm:text-[35px]'/><span className='text-nowrap text-secoundary_color font-semibold'>No results found</span>
          </div></div></td></tr>

          }
            
            
        </tbody>:null
        }

    </table>
    <div>
        {
            search.trim() == "" ? <CustomPagination isLoading={isLoading} page={page} setPage={setPage} totalElement={logs?.data?.total} />:null
        }
           
        </div>



        </div>

   </div>
    </div>
  )
}

export default View_history