import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from '../../../../Hooks/usePrevious';
import { deleteOffer, getOffer_info_, getOffers,SearchOffer  } from '../../../../Redux/ApiSlices/employee/ManageOffersSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faEye, faMicrophone, faPenToSquare, faPlus, faReply, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import select_image from "/assets/images/select_image.png";
import Headings from '../../../../Components/Headings/Headings';
import Button from '../../../../Components/Button/Button';
import Loading1 from '../../../../Components/Loading/Loading1';
import CustomPagination from '../../../../Components/Pagination/CustomPagination';
import Loading3 from '../../../../Components/Loading/Loading3';
import SpeachToText from '../../../../Components/Voice_Modal/SpeachToText';
import Add_offer from './Components/Add_offer';
import Update_offer from './Components/Update_offer';
import Modal from '../../../../Components/Modal/Modal';
import { toast } from 'react-toastify';


const Manage_Offer = () => {
  const dispatch = useDispatch();
  const {offers,isLoading,isLoadingSearch,SearchOffers,error,offer_info}=useSelector((state)=>state.offers);
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

   //  state updating offer
   const [description,setDescription]=useState("");
   const [start_date,setStart_date]=useState(null);
   const [end_date,setEnd_date]=useState(null);
   const [image,setImage]=useState(null);
   const [title,setTitle]=useState("");
   const [flight_id,setFlight_id]=useState(null);
   const [discount,setDiscount]=useState(null);

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
    useEffect(()=>{
      const debounce=setTimeout(() => {
          if(prev != search)
          {
              dispatch(SearchOffer(search))
          }
      }, 700);
      return ()=>{
          clearTimeout(debounce)
      }
  },[search]);
     // while refresh page
     useEffect(()=>{
      dispatch(getOffers(page)).unwrap().then((res)=>{
          window.sessionStorage.setItem("page",JSON.stringify(page))
      }).catch((rej)=>{
          return toast.error(rej?.response?.data?.message);
      })
  },[page]);

  const getOffer_info=(id)=>{
    dispatch(getOffer_info_(id)).unwrap().then((res)=>{
      setDescription(res?.data?.description);
      setTitle(res?.data?.title);
      setDiscount(res?.data?.discount);
      setStart_date(res?.data?.start_date);
      setEnd_date(res?.data?.end_date);
      setFlight_id(res?.data?.flight_id);
    })
  }
  const handelDeleteOffer=(id)=>{
    dispatch(deleteOffer(id)).unwrap().then((res)=>{
        setSearch("")
        if(window.sessionStorage.getItem("page")){
            let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
            dispatch(getOffers(pageSaved))
          }
        setOpen6(!open6)
        return toast.success(res?.success)
    }).catch((rej)=>{
        return toast.error(rej?.response?.data?.message)
    })
}

  return (<div className='relative flex flex-col justify-start items-start mt-[78px] lg:mt-[85px] h-auto w-full  lg:w-[calc(100%-296px)] ml-0 sm:ml-auto'>

   {/* add offer */}
   <Add_offer open3={open3} setOpen3={setOpen3} setSearch={setSearch}/>
   {/* update offer */}
   <Update_offer open1={open1} setOpen1={setOpen1} offer_info={offer_info} description={description} setDescription={setDescription} discount={discount} setDiscount={setDiscount}
    setTitle={setTitle} title={title} flight_id={flight_id}
     setFlight_id={setFlight_id} image={image} setImage={setImage} page={page} getOffers={getOffers}
   />
   {/* delete flight */}
            <Modal open={open6} setOpen={setOpen6}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to delete <span className='font-extrabold text-secoundary_color/80'>{data?.title}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelDeleteOffer(data?.id)} color={"#cf2e2e"} padding='5px'>Delete</Button>
            <Button onClick={()=>setOpen6(!open6)} color={"#777"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal>
          

   {/* Vice Modal */}
 <SpeachToText open5={open5} setOpen5={setOpen5} search={search} setSearch={setSearch}/>
    <div className='h-auto bg-gradient-to-t  p-2 md:p-8 w-full '>
    <div className="flex items-center justify-between flex-column p-4 flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 rounded-t-2xl  bg-black/20">
    <div className='text-left'>
    <Headings element={"h3"}>manage offers</Headings>
    </div>
    <label htmlFor="table-search" className="sr-only">Search</label>
    <div className="relative">
        <div className="shadow-xl shadow-black_color/40 rounded-xl border-[1px] border-solid border-white/30">
        <Button onClick={()=>{setOpen3(true);}}>  <FontAwesomeIcon icon={faPlus}  className='text-[20px] font-bold text-primary_color/80 pr-2'/>Add offer</Button>
        </div>
        
        
    </div>
    <div className="relative flex justify-center items-center">
        <div className="absolute  inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-5 h-5 text-primary_color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="text" id="table-search-users" value={search} onChange={(e)=>setSearch(e.target.value)} className="block p-2 ps-10 text-lg shadow-xl border-r-0 shadow-black_color/40 text-white_color border border-gray-300 rounded-l-lg w-[180px] sm:w-[200px] lg:w-80 bg-black/5 focus:ring-blue-500 focus:border-blue-500   placeholder:text-secoundary_color dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for offers"/>
            <FontAwesomeIcon icon={faMicrophone} onClick={()=>setOpen5(true)} className='text-white/90  bg-primary_color/70 w-[20px] h-[44.4px]  lg:h-[44px] px-1 shadow-xl rounded-r-lg border-[0.5px] border-l-0 border-gray-300 shadow-black_color/40'/>
    </div>
</div>

         <div className="relative overflow-x-auto   shadow-2xl shadow-black_color/50  lg:rounded-b-lg">
         <table className="w-full text-sm text-left rtl:text-right text-gray-900 relative">
    <thead className="text-xs text-primary_color uppercase  bg-secoundary_color_1 ">
        <tr>
            
            <th scope="col" className="px-6 py-3">
                Title
            </th>
            <th scope="col" className="px-6 py-3">
                Description
            </th>
            <th scope="col" className="px-6 py-3">
                Start Date 
            </th>
            <th scope="col" className="px-6 py-3">
                End date
            </th>
            <th scope="col" className="px-6 py-3">
                Discount
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
    
   
    {search.trim() == "" ?<tbody>
    
    {isLoading ? <tr> <td className=' p-5  rounded-xl z-[99999]  '></td> <td className=' p-5  rounded-xl z-[99999]  '></td><td className='hidden sm:block p-5  rounded-xl z-[99999]  '></td><td className=' rounded-xl z-[99999] px-6 py-5 text-center align-middle'> 
        <div className="ps-3">
         <div className="text-base ml-12"> 
         <Loading1/>
          </div></div></td></tr>:
          offers?.data?.data?.map((offer)=>{
            return (
                <tr key={offer?.offer_id} className="bg-white_color/80 border-b  border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">
        <td scope="row" className="flex items-center px-6 py-10 text-primary_color_1 flex-col xl:flex-row">
         <img className="w-[90px] h-[80px] object-contain rounded-md bg-black/15" src={offer?.image != "" ? `http://127.0.0.1:8000/${offer?.image}` : select_image} />
            <div className="ps-3">
                <div className="text-[13px] font-bold w-[90px] text-wrap">{offer?.title}</div>
            </div> 
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[13] text-primary_color_1"> 
          {offer?.description}
          </div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[13] text-primary_color_1"> 
          {new Date(offer?.start_date).toLocaleDateString()}
          </div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[13] text-primary_color_1"> 
          {new Date(offer?.end_date).toLocaleDateString()}
          </div>
        </div>
        </td>
       
        <td className="px-6 py-2">
        <div className="ps-3">
        
        <div className="text-[13] text-primary_color_1"> 
          {offer?.discount}
          </div>
          
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3 text-center">
         <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
          number <span className='text-secoundary_color_1/80 font-semibold'>{offer?.flight?.flight_number}</span>
          </div>
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         price <span className='text-secoundary_color_1/80 font-semibold'>{offer?.flight?.price}$</span>
          </div>
         
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         miles <span className='text-secoundary_color_1/80 font-semibold'>{offer?.flight?.miles}</span>
          </div>
         
          
        </div>
        </td>
    
        <td className="px-6 py-2">
            <div className="flex items-center">
            {offer?.deleted_at == null ?<> <div className="h-2.5 w-2.5 rounded-full bg-green-400 me-2"></div> Active</>:<><div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div> Inactive</>}
            </div>
        </td>
        <td className=" text-center  align-middle text-nowrap">
           {
            offer?.deleted_at == null ?<button  onClick={()=>{setOpen6(true);setData({id:offer?.offer_id,title:offer?.title})}} className="font-bold text-[22px] m-2 text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
            <FontAwesomeIcon icon={faTrashCan} />
            </button>:
            <button onClick={()=>{setOpen7(true);setData({id:offer?.offer_id,title:offer?.title})}} className="font-bold text-[22px] text-green_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faReply} />

            </button>
           } 
           {
            offer?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] m-2 text-secoundary_color/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} /></button>:
            <button onClick={()=>{setOpen1(true); getOffer_info(offer?.offer_id)}} className="font-bold text-[20px] text-secoundary_color/80  m-2  hover:underline">
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
    
    {isLoadingSearch ?  <tr> <td className=' p-5  rounded-xl z-[99999]  '></td><td className=' p-5  rounded-xl z-[99999]  '></td><td className='hidden sm:block p-5  rounded-xl z-[99999]  '></td><td className=' rounded-xl z-[99999] px-6 py-5 text-center align-middle'> 
        <div className="ps-3">
         <div className="text-base ml-12"> 
         <Loading3/>
          </div></div></td></tr>:
          SearchOffers?.data?.data.length != 0 ? 
          SearchOffers?.data?.data.map((offer)=>{
            return (
                <tr key={offer?.offer_id} className="bg-white_color/80 border-b  border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">
        <td scope="row" className="flex items-center px-6 py-10 text-primary_color_1 flex-col xl:flex-row">
         <img className="w-[90px] h-[80px] object-contain rounded-md bg-black/15" src={offer?.image != "" ? `http://127.0.0.1:8000/${offer?.image}` : select_image} />
            <div className="ps-3">
                <div className="text-[13px] font-bold w-[90px] text-wrap">{offer?.title}</div>
            </div> 
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[13] text-primary_color_1"> 
          {offer?.description}
          </div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[13] text-primary_color_1"> 
          {new Date(offer?.start_date).toLocaleDateString()}
          </div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[13] text-primary_color_1"> 
          {new Date(offer?.end_date).toLocaleDateString()}
          </div>
        </div>
        </td>
       
        <td className="px-6 py-2">
        <div className="ps-3">
        
        <div className="text-[13] text-primary_color_1"> 
          {offer?.discount}
          </div>
          
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3 text-center">
         <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
          number <span className='text-secoundary_color_1/80 font-semibold'>{offer?.flight?.flight_number}</span>
          </div>
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         price <span className='text-secoundary_color_1/80 font-semibold'>{offer?.flight?.price}$</span>
          </div>
         
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         miles <span className='text-secoundary_color_1/80 font-semibold'>{offer?.flight?.miles}</span>
          </div>
         
          
        </div>
        </td>
    
        <td className="px-6 py-2">
            <div className="flex items-center">
            {offer?.deleted_at == null ?<> <div className="h-2.5 w-2.5 rounded-full bg-green-400 me-2"></div> Active</>:<><div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div> Inactive</>}
            </div>
        </td>
        <td className=" text-center  align-middle text-nowrap">
           {
            offer?.deleted_at == null ?<button  onClick={()=>{setOpen6(true);setData({id:offer?.offer_id,title:offer?.title})}} className="font-bold text-[22px] m-2 text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
            <FontAwesomeIcon icon={faTrashCan} />
            </button>:
            <button onClick={()=>{setOpen7(true);setData({id:offer?.offer_id,title:offer?.title})}} className="font-bold text-[22px] text-green_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faReply} />

            </button>
           } 
           {
            offer?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] m-2 text-secoundary_color/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} /></button>:
            <button onClick={()=>{setOpen1(true); getOffer_info(offer?.offer_id)}} className="font-bold text-[20px] text-secoundary_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} />
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
        search.trim() == "" ? <CustomPagination isLoading={isLoading} page={page} setPage={setPage} totalElement={offers?.data?.total} perPage={15}/>:null
    }
       
    </div>





         </div>




    </div>




  </div>
   
  )
}

export default Manage_Offer