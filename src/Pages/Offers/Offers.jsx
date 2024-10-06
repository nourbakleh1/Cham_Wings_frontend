import React, { useEffect, useState } from 'react'
import Headings from '../../Components/Headings/Headings'
import { useDispatch, useSelector } from 'react-redux'
import { usePrevious } from '../../Hooks/usePrevious';
import { getOffers_search_User, getOffersUser } from '../../Redux/ApiSlices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import Offer_item from '../../Components/Offers/Offer_item';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import Loading1 from '../../Components/Loading/Loading1';
import { toast } from 'react-toastify';
import Loading2 from '../../Components/Loading/Loading2';
import Loading3 from '../../Components/Loading/Loading3';
import SpeachToText from '../../Components/Voice_Modal/SpeachToText';
import { clear_reservation } from '../../Redux/ApiSlices/reservationSlice';

const Offers = () => {
    const dispatch=useDispatch();
    const { user_offers,Search_offers,error,isLoading}=useSelector((state)=>state.auth);
    const [page,setPage]=useState(1);
    const [search,setSearch]=useState("");
    const prev= usePrevious(search);
    const [open5,setOpen5]=useState(false);

    
   
    useEffect(()=>{
      window.scrollTo(0,0);
      dispatch(clear_reservation());

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
                dispatch(getOffers_search_User(search))
            }
        }, 700);
        return ()=>{
            clearTimeout(debounce)
        }
    },[search]);

    // while refresh page
    useEffect(()=>{
    dispatch(getOffersUser(page)).unwrap().then((res)=>{
        window.sessionStorage.setItem("page",JSON.stringify(page))
    }).catch((rej)=>{
        return toast.error(rej?.response?.data?.message);
    })
  },[page]);

  return (
    <div className='mt-[77px] lg:mt-[82px] '>
       <div className="flex items-center justify-around  flex-column  p-4 flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4  bg-black/20">
        {/* Vice Modal */}
        <SpeachToText open5={open5} setOpen5={setOpen5} search={search} setSearch={setSearch}/>

        <div className='text-left'>
        <Headings element={"h1"} color='#ae8a3b'>offers & discounts</Headings>
        </div>
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative flex justify-center items-center">
            <div className="absolute  inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-5 h-5 text-primary_color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="table-search-users" value={search} onChange={(e)=>setSearch(e.target.value)} className="block p-2 ps-10 text-lg shadow-xl border-r-0 shadow-black_color/40 text-white_color border border-gray-300 rounded-l-lg w-[180px] sm:w-[200px] lg:w-80 bg-black/5 focus:ring-blue-500 focus:border-blue-500   placeholder:text-secoundary_color dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for offers"/>
            <FontAwesomeIcon icon={faMicrophone} onClick={()=>setOpen5(true)}  className='text-white/90  bg-primary_color/70 w-[20px] h-[44.4px]  lg:h-[44px] px-1 shadow-xl rounded-r-lg border-[0.5px] border-l-0 border-gray-300 shadow-black_color/40'/>
        </div>
        </div>
        
        <div className='offers bg-off_white/90 pt-28 px-4 lg:px-32'>
        <div className='flex justify-center gap-8 md:gap-12 items-center flex-wrap p-5'>
        
                {search.trim() == ""  ?
                   isLoading ?<Loading1/> : user_offers?.data?.data.map((offer)=>{
                        return <Offer_item key={offer.offer_id} offer={offer}/>
                        
                    }):null
                }
                {search.trim() != ""  ?<>
                   {isLoading ?<Loading3/> :Search_offers?.data?.data.length != 0 ? Search_offers?.data?.data.map((offer)=>{
                        return <Offer_item key={offer.offer_id} offer={offer}/>
                        
                    }):<div className="">
                    <div className="text-base  flex justify-start items-start  my-5 shadow-xl shadow-black/60 w-fit p-2"> 
                    <FontAwesomeIcon icon={faBoxOpen} className='text-primary_color text-[25px] sm:text-[35px]'/><span className='text-nowrap text-secoundary_color font-semibold'>No results found</span>
                      </div></div> }
                    </>:null
               }


        </div>
        <div className='pt-16 lg:pl-24'>
        {
            search.trim() == "" ? <CustomPagination isLoading={isLoading} page={page} setPage={setPage} totalElement={user_offers?.data?.total} perPage={15}/>:null
        }
           
        </div>
        </div>

    </div>
  )
}

export default Offers