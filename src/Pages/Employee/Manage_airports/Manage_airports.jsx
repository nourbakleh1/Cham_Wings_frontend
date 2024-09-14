import { faEye, faPenToSquare,faPlus, faReply, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../Components/Button/Button';
import Headings from '../../../Components/Headings/Headings';
import Loading1 from '../../../Components/Loading/Loading1';
import { activateAirport, AddVisa, deleteAirport, deleteVisa, getAirport_info, getAirports, getALLAirports, getVisaInSpecificAirport, updateVisa } from '../../../Redux/ApiSlices/employee/airportSlice';
import Pagination from '../../../Components/Pagination/Pagination';
import Add_airport from './Components/Add_airport';
import Update_airport from './Components/Update_airport';
import Modal from '../../../Components/Modal/Modal';
import { toast } from 'react-toastify';
import CustomPagination from '../../../Components/Pagination/CustomPagination';
import select_image from "/assets/images/select_image.png";
import Loading4 from '../../../Components/Loading/Loading4';




const Manage_airports = () => {
  const dispatch = useDispatch();
  const {All_airports,Paginat_airports,isLoading,error,airport_info,visaInfo,isLoading_visa}=useSelector(state=>state.airports);
  const [page,setPage]=useState(1);

  // modal state
  const [open,setOpen]=useState(false);
  const [open1,setOpen1]=useState(false);
  const [open2,setOpen2]=useState(false);
  const [open3,setOpen3]=useState(false);
  const [open4,setOpen4]=useState(false);
  const [open5,setOpen5]=useState(false);
  const [open6,setOpen6]=useState(false);

   //  state adding airport
    
   const [airport_name,setAirport_name]=useState("");
   const [city,setCity]=useState("");
   const [country,setCountry]=useState("");
   const [airport_code,setAirport_code]=useState("");
   const [image,setImage]=useState(null);

 // helper data
 const [data,setData]=useState(null);
 const [visa,setVisa]=useState(null);

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

const get_Visa_Info=(id)=>{
    dispatch(getVisaInSpecificAirport(id)).unwrap().then((res)=>{
      setVisa_and_residence(res?.data?.data[0]?.visa_and_residence);
      setOrigin(res?.data?.data[0]?.origin);
      setDestination(res?.data?.data[0]?.destination);
    });
    setData({id:id});
}
    
  const [visa_and_residence,setVisa_and_residence]=useState("");
  const [origin,setOrigin]=useState("");
  const [destination,setDestination]=useState("");

    const handelAddVisa=(id)=>{
      if(visa_and_residence.trim() == ""){
        return toast.error("Visa and residence is required")
    }
    if(origin.trim() == ""){
        return toast.error("Origin is required")
    }
  
    if(destination.trim() == ""){
        return toast.error("Destination is required")
    }
    const visa={visa_and_residence,origin,destination}
    const data={
      visa,id
    }
    dispatch(AddVisa(data)).unwrap().then((res)=>{
      dispatch(getVisaInSpecificAirport(id));
      setOpen5(false)
      setDestination("");
      setVisa_and_residence("");
      setOrigin("");
      return toast.success(res?.success);
    }).catch((rej)=>{
      return toast.error(rej?.response?.data?.message)
    })
    }

    const handelUpdateVisa=(id)=>{
      if(visa_and_residence.trim() == ""){
        return toast.error("Visa and residence is required")
    }
    if(origin.trim() == ""){
        return toast.error("Origin is required")
    }
  
    if(destination.trim() == ""){
        return toast.error("Destination is required")
    }
    const visa={visa_and_residence,origin,destination}
    const data={
      visa,id
    }
    dispatch(updateVisa(data)).unwrap().then((res)=>{
      dispatch(getVisaInSpecificAirport(id));
      setOpen6(false)
     
      return toast.success(res?.success);
    }).catch((rej)=>{
      return toast.error(rej?.response?.data?.message)
    })
    }
    const handelDeletevisa=(id)=>{
      dispatch(deleteVisa(id)).unwrap().then((res)=>{
        dispatch(getVisaInSpecificAirport(id));
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
    

    {/* delete airport */}
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
           {/* manage visa */}
    <Modal open={open3} setOpen={setOpen3}>
      
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>
            <div className='border-b-2 border-solid border-primary_color w-fit mx-auto mb-6'>
            <Headings element={"h2"} color='#00529B' >Visa info</Headings>
            </div>

            {
              isLoading_visa ? <Loading1/>:
                  <div key={visaInfo?.data?.data[0]?.visainfo_id}>
                  <div className='flex justify-center items-center flex-col text-center text-[15px]  text-black gap-5'>
                    <p className='p-2 shadow-sm shadow-primary_color w-[200px] md:w-[250px] font-bold text-nowrap'>visa_and_residence : <span className='text-primary_color'>{visaInfo?.data?.data[0]?.visa_and_residence}</span> </p>
                    <p className='p-2 shadow-sm shadow-primary_color w-[200px] md:w-[250px] font-bold text-nowrap'>origin : <span className='text-primary_color'>{visaInfo?.data?.data[0]?.origin}</span></p>
                    <p className='p-2 shadow-sm shadow-primary_color w-[200px] md:w-[250px] font-bold text-nowrap'>destination : <span className='text-primary_color'>{visaInfo?.data?.data[0]?.destination}</span></p>
                    </div>
                    {visaInfo?.data?.data[0] == null  ?  <div className='flex justify-center items-center mt-10 gap-3'><Button onClick={()=>setOpen5(true)} color={"#00529B"}>Add visa</Button></div>: <div className='flex mt-10 justify-center items-center gap-3'>
                    <Button onClick={()=>{handelDeletevisa(visaInfo?.data?.data[0]?.visainfo_id)}} color={"#cf2e2e"} padding='5px'>Delete</Button>
                    <Button onClick={()=>{setOpen6(!open6);setVisa({id:visaInfo?.data?.data[0]?.visainfo_id});get_Visa_Info(data?.id)}} color={"#00529B"} padding='5px'>Update</Button>
                    </div> }
                  </div>
            }
            </div>
            </div>
           </Modal>

            {/*  add visa  */}
            <Modal open={open5} setOpen={setOpen5}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>
            <div className='border-b-2 border-solid border-primary_color w-fit mx-auto mb-6'>
            <Headings element={"h3"} color='#00529B' >add visa</Headings>
            </div>
            <div className="grid md:grid-cols-1 md:gap-6">
   
              <div className="relative z-0 w-full mb-1 lg:mb-4 group">
                  <input type="text" value={visa_and_residence} onChange={(e)=>setVisa_and_residence(e.target.value)}  name="floating_name" id="visa" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="visa" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Visa and residence</label>
              </div>
            </div>
            <div className="grid md:grid-cols-1 md:gap-6">
            
              <div className="relative z-0 w-full mb-1 lg:mb-4 group">
                  <input type="text" value={origin} onChange={(e)=>setOrigin(e.target.value)}  name="floating_name" id="origin" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="origin" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Origin</label>
              </div>
            </div>
            <div className="grid md:grid-cols-1 md:gap-6">
            
              <div className="relative z-0 w-full mb-1 lg:mb-4 group">
                  <input type="text" value={destination} onChange={(e)=>setDestination(e.target.value)}  name="floating_name" id="des" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="des" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Destination</label>
              </div>
            </div>
            <div className='flex gap-3'>
            <Button onClick={()=>handelAddVisa(data?.id)} color={"#00529B"} padding='5px'>create</Button>
            </div>
           
            </div>

            </div>
           </Modal>
           {/*  update visa  */}
           <Modal open={open6} setOpen={setOpen6}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>
            <div className='border-b-2 border-solid border-primary_color w-fit mx-auto mb-6'>
            <Headings element={"h3"} color='#00529B' >Edit visa</Headings>
            </div>
            <div className="grid md:grid-cols-1 md:gap-6">
   
              <div className="relative z-0 w-full mb-1 lg:mb-4 group">
                  <input type="text" value={visa_and_residence} onChange={(e)=>setVisa_and_residence(e.target.value)}  name="floating_name" id="visa" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="visa" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Visa and residence</label>
              </div>
            </div>
            <div className="grid md:grid-cols-1 md:gap-6">
            
              <div className="relative z-0 w-full mb-1 lg:mb-4 group">
                  <input type="text" value={origin} onChange={(e)=>setOrigin(e.target.value)}  name="floating_name" id="origin" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="origin" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Origin</label>
              </div>
            </div>
            <div className="grid md:grid-cols-1 md:gap-6">
            
              <div className="relative z-0 w-full mb-1 lg:mb-4 group">
                  <input type="text" value={destination} onChange={(e)=>setDestination(e.target.value)}  name="floating_name" id="des" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="des" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Destination</label>
              </div>
            </div>
            <div className='flex gap-3'>
            <Button onClick={()=>handelUpdateVisa(visa?.id)} color={"#00529B"} padding='5px'>Update</Button>
            </div>
           
            </div>

            </div>
           </Modal>
           {/* delete visa */}
       {/* <Modal open={open7} setOpen={setOpen7}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to delete <span className='font-extrabold text-secoundary_color/80'>visa</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelDeletevisa(visa?.id)} color={"#cf2e2e"} padding='5px'>Delete</Button>
            </div>
           
            </div>

            </div>
           </Modal> */}
           {/* manage visa */}
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
        <td scope="row" className="flex items-center px-6 py-10 text-primary_color_1 flex-col xl:flex-row">
         <img className="w-[120px] h-[100px] p-1 object-contain rounded-md bg-black/15" src={airport?.image != "" ? `http://127.0.0.1:8000${airport?.image}` : select_image} />
            <div className="ps-3">
                <div className="text-[13px] font-bold w-[120px] text-wrap">{airport?.airport_name}</div>
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
        <td className=" text-center  align-middle text-nowrap">
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
           {
            airport?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] m-2 text-primary_color_1/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
            <FontAwesomeIcon icon={faEye} /></button>:
            <button onClick={()=>{setOpen3(true); get_Visa_Info(airport?.airport_id)}} className="font-bold text-[20px] text-primary_color_1/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faEye} />
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