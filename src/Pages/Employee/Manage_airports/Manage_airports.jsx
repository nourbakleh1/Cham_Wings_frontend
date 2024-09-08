import { faPenToSquare,faPlus, faReply, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../Components/Button/Button';
import Headings from '../../../Components/Headings/Headings';
import Loading1 from '../../../Components/Loading/Loading1';
import { activateAirport, deleteAirport, getAirport_info, getAirports, getALLAirports } from '../../../Redux/ApiSlices/employee/airportSlice';
import Pagination from '../../../Components/Pagination/Pagination';
import Add_airport from './Components/Add_airport';
import Update_airport from './Components/Update_airport';
import Modal from '../../../Components/Modal/Modal';
import { toast } from 'react-toastify';
import CustomPagination from '../../../Components/Pagination/CustomPagination';
import select_image from "/assets/images/select_image.png";




const Manage_airports = () => {
  const dispatch = useDispatch();
  const {All_airports,Paginat_airports,isLoading,error,airport_info}=useSelector(state=>state.airports);
  const [page,setPage]=useState(1);

  // modal state
  const [open,setOpen]=useState(false);
  const [open1,setOpen1]=useState(false);
  const [open2,setOpen2]=useState(false);
  const [open3,setOpen3]=useState(false);
  const [open4,setOpen4]=useState(false);


   //  state adding airport
    
   const [airport_name,setAirport_name]=useState("");
   const [city,setCity]=useState("");
   const [country,setCountry]=useState("");
   const [airport_code,setAirport_code]=useState("");
   const [image,setImage]=useState(null);

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
  }
},[]);

 // while refresh page
 useEffect(()=>{
  dispatch(getALLAirports(page)).unwrap().then((res)=>{
      window.sessionStorage.setItem("page",JSON.stringify(page))
  }).catch((rej)=>{
      return toast.error(rej?.response?.data?.message);
  })
},[page]);

const get_Airport_Info=(id)=>{
  setImage(null)
  dispatch(getAirport_info(id)).unwrap().then((res)=>{
      setAirport_name(res?.data.airport_name);
      setAirport_code(res?.data.airport_code);
      setCity(res?.data.city);
      setCountry(res?.data.country);
  })

}
const handelDeleteAirport=(id)=>{
  dispatch(deleteAirport(id)).unwrap().then((res)=>{
      if(window.sessionStorage.getItem("page")){
          let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
          dispatch(getALLAirports(pageSaved))
        }
      setOpen1(!open1)
      return toast.success(res?.success)
  }).catch((rej)=>{
      return toast.error(rej?.response?.data?.message)
  })
}

const handelActiveAirport=(id)=>{
  dispatch(activateAirport(id)).unwrap().then((res)=>{
      if(window.sessionStorage.getItem("page")){
          let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
          dispatch(getALLAirports(pageSaved))
        }
      setOpen4(!open4)
      return toast.success(res?.success)
  }).catch((rej)=>{
      return toast.error(rej?.response?.data?.message)
  })
}

    
  return (
    <div className='relative flex flex-col justify-start items-start mt-[78px] lg:mt-[85px] h-auto w-full  lg:w-[calc(100%-296px)] ml-0 sm:ml-auto'>

    <Add_airport open2={open2} setOpen2={setOpen2}/>
    <Update_airport open={open}  setOpen={setOpen} select_image={select_image} image={image} setImage={setImage} city={city} setCountry={setCountry} country={country} setCity={setCity} airport_name={airport_name} airport_code={airport_code}
      setAirport_name={setAirport_name} setAirport_code={setAirport_code} airport_info={airport_info}
    />
    


    <Modal open={open1} setOpen={setOpen1}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to delete <span className='font-extrabold text-secoundary_color/80'>{data?.name}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelDeleteAirport(data?.id)} color={"#cf2e2e"} padding='5px'>Delete</Button>
            <Button onClick={()=>setOpen1(!open1)} color={"#777"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal>
           {/* activate airport  */}
           <Modal open={open4} setOpen={setOpen4}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to activate <span className='font-extrabold text-secoundary_color/80'>{data?.name}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelActiveAirport(data?.id)} color={"#00d084"} padding='5px'>Activation</Button>
            <Button onClick={()=>setOpen4(!open4)} color={"#777"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal>
    


    <div className='h-auto bg-gradient-to-t  p-2 md:p-8 w-full '>
    <div className="flex items-center justify-between flex-column p-4 flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 rounded-t-2xl  bg-black/20">
    <div className='text-left'>
    <Headings element={"h3"}>manage airports</Headings>
    </div>
    <div className="relative">
        <div className="shadow-xl shadow-black_color/40 rounded-xl border-[1px] border-solid border-white/30">
        <Button onClick={()=>{setOpen2(true);}}> <FontAwesomeIcon icon={faPlus} className='text-[20px] font-bold text-primary_color/80 pr-2'/>Add airport</Button>
        </div>
    </div>

   
</div>
  <div className="relative overflow-x-auto   shadow-2xl shadow-black_color/50  lg:rounded-b-lg">

  <table className="w-full text-sm text-left rtl:text-right text-gray-900 relative">
    <thead className="text-xs text-primary_color uppercase  bg-secoundary_color_1 ">
        <tr>
            
            <th scope="col" className="px-6 py-3">
               Airport name
            </th>
            <th scope="col" className="px-6 py-3">
             Airport code
            </th>
            <th scope="col" className="px-6 py-3">
                City
            </th>
            <th scope="col" className="px-6 py-3">
                Country
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
    
    {isLoading ? <tr> <td className=' p-5  rounded-xl z-[99999]  '></td><td className='hidden sm:block p-5  rounded-xl z-[99999]  '></td><td className=' rounded-xl z-[99999] px-6 py-5 text-center align-middle'> 
        <div className="ps-3">
         <div className="text-base ml-12"> 
         <Loading1/>
          </div></div></td></tr>:
          Paginat_airports?.data?.data?.map((airport)=>{
            return (
                <tr key={airport?.airport_id} className="bg-white_color/80 border-b  border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">
        <td scope="row" className="flex items-center px-6 py-10 text-primary_color_1 whitespace-nowrap ">
         <img className="w-[120px] h-[100px] p-1 object-contain rounded-md bg-black/15" src={airport?.image != "" ? `http://127.0.0.1:8000${airport?.image}` : select_image} />
            <div className="ps-3">
                <div className="text-[14px] font-bold w-[150px] text-wrap">{airport?.airport_name}</div>
            </div> 
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[13] text-primary_color_1"> 
          {airport?.airport_code}
          </div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[13] text-primary_color_1"> 
          {airport?.city}
          </div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
        
        <div className="text-[13] text-primary_color_1"> 
          {airport?.country}
          </div>
          
        </div>
        </td>
       
    
        <td className="px-6 py-2">
            <div className="flex items-center">
            {airport?.deleted_at == null ?<> <div className="h-2.5 w-2.5 rounded-full bg-green-400 me-2"></div> Active</>:<><div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div> Inactive</>}
            </div>
        </td>
        <td className=" text-center  align-middle">
           {
            airport?.deleted_at == null ?<button  onClick={()=>{setOpen1(true);setData({id:airport?.airport_id,name:airport?.airport_code})}} className="font-bold text-[22px] m-2 text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
            <FontAwesomeIcon icon={faTrashCan} />
            </button>:
            <button onClick={()=>{setOpen4(true);setData({id:airport?.airport_id,name:airport?.airport_code})}} className="font-bold text-[22px] text-green_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faReply} />

            </button>
           } 
           {
            airport?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] m-2 text-secoundary_color/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} /></button>:
            <button onClick={()=>{setOpen(true); get_Airport_Info(airport?.airport_id)}} className="font-bold text-[20px] text-secoundary_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} />
            </button>
           } 
        </td>
    </tr>
            )
        })
    }    
</tbody>
</table>
<div>
    
         <CustomPagination isLoading={isLoading} page={page} setPage={setPage} totalElement={Paginat_airports?.data?.total} perPage={15}/>
    
       
    </div>
  </div>
    </div>
    </div>
  )
}

export default Manage_airports