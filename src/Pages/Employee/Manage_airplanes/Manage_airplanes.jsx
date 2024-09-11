import { faEye, faFolderOpen, faPenToSquare,faPlus, faReply, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { activateAirplane, AddClass, deleteAirplane, deleteClass, getAirplane_info, getAirplanes, updateClass } from '../../../Redux/ApiSlices/employee/ManageAirplanesSlice';
import Loading1 from '../../../Components/Loading/Loading1';
import Headings from '../../../Components/Headings/Headings';
import Button from '../../../Components/Button/Button';
import Add_airplane from './Components/Add_airplane';
import Update_airplane from './Components/Update_airplane';
import Modal from '../../../Components/Modal/Modal';
import LargeModal from '../../../Components/Modal/LargeModal';


const Manage_airplanes = () => {
  const dispatch = useDispatch();
  const {airplanes,isLoading,error,airplane_info}=useSelector(state=>state.airplanes);
 
  const [page,setPage]=useState(1);

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



   //  state adding airplane
    
   const [model,setModel]=useState("");
   const [manufacturer,setManufacturer]=useState("");
   const [range,setRange]=useState("");

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
  dispatch(getAirplanes(page)).unwrap().then((res)=>{
      window.sessionStorage.setItem("page",JSON.stringify(page))
  }).catch((rej)=>{
      return toast.error(rej?.response?.data?.message);
  })
},[page]);

const get_AirPlane_Info=(id)=>{
  dispatch(getAirplane_info(id)).unwrap().then((res)=>{
      setModel(res?.data.model);
      setManufacturer(res?.data.manufacturer);
      setRange(res?.data.range);
     
  })

}
const handelDeleteAirplane=(id)=>{
  dispatch(deleteAirplane(id)).unwrap().then((res)=>{
      if(window.sessionStorage.getItem("page")){
          let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
          dispatch(getAirplanes(pageSaved))
        }
      setOpen1(!open1)
      return toast.success(res?.success)
  }).catch((rej)=>{
      return toast.error(rej?.response?.data?.message)
  })
}

  // state for class
  const [class_name,setClass_name]=useState(null);
  const [price_rate,setPrice_rate]=useState(null);
  const [weight_allowed,setWeight_allowed]=useState(null);
  const [number_of_meals,setNumber_of_meals]=useState(null);
  const [cabin_weight,setCabin_weight]=useState(null);
  const [Id,setId]=useState(null);
    



  const handelAddClass=(e)=>{
    e.preventDefault();
       
        if(class_name == null){
        return toast.error("Class name is required")
        }
         if(cabin_weight == null){
        return toast.error("Cabin weight is required")
        }
        if(price_rate == null){
            return toast.error("Price rate is required")
        }
        if(number_of_meals == null){
            return toast.error("Number of meals is required")
        }
        if(weight_allowed == null){
            return toast.error("Weight allowed is required")
        }
       
        const data={
          class_name,price_rate,weight_allowed,number_of_meals,cabin_weight
        }
       let id=airplane_info?.data?.airplane_id
       const Class={id,data}
        dispatch(AddClass(Class)).unwrap().then((res)=>{
            setOpen5(false);
            dispatch(getAirplane_info(id));
            setClass_name(null);
            setCabin_weight(null);
            setWeight_allowed(null);
            setNumber_of_meals(null);
            setPrice_rate(null);
            return toast.success(res?.success)
        }).catch((rej)=>{
            return toast.error(rej?.response?.data?.errors)
        })
  }

    const fillDatainClass=(id_Class)=>{
    const element=  airplane_info?.data?.classes?.find((el)=>{
        return  el.class_id == id_Class
      });
      
        setClass_name(element?.class_name);
        setCabin_weight(element?.cabin_weight);
        setPrice_rate(element?.price_rate);
        setWeight_allowed(element?.weight_allowed);
        setNumber_of_meals(element?.number_of_meals);
        setId(element?.class_id)
    }


   const handelUpdateClass =()=>{
        if(class_name == null){
          return toast.error("Class name is required")
          }
          if(cabin_weight == null){
            return toast.error("Cabin weight is required")
            }
          if(price_rate == null){
              return toast.error("Price rate is required")
          }
          if(number_of_meals == null){
              return toast.error("Number of meals is required")
          }
          if(weight_allowed == null){
              return toast.error("Weight allowed is required")
          }
        
          const data={
            class_name,price_rate,weight_allowed,number_of_meals,cabin_weight
          }
        let id=airplane_info?.data?.airplane_id
        const Class={Id,data}
          dispatch(updateClass(Class)).unwrap().then((res)=>{
              setOpen6(false);
              dispatch(getAirplane_info(id));
              
              return toast.success(res?.success)
          }).catch((rej)=>{
              return toast.error(rej?.response?.data?.errors)
          })
   }

   const handelDeleteClass=(id)=>{
    dispatch(deleteClass(id)).unwrap().then((res)=>{
       
            dispatch(getAirplane_info(airplane_info?.data?.airplane_id));
          
        setOpen7(!open7)
        return toast.success(res?.success)
    }).catch((rej)=>{
        return toast.error(rej?.response?.data?.message)
    })
  }
  const handelActiveAirplane=(id)=>{
    dispatch(activateAirplane(id)).unwrap().then((res)=>{
        if(window.sessionStorage.getItem("page")){
            let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
            dispatch(getAirplanes(pageSaved))
          }
        setOpen8(!open8)
        return toast.success(res?.success)
    }).catch((rej)=>{
        return toast.error(rej?.response?.data?.message)
    })
  }
  return (
    <div className='relative flex flex-col justify-start items-start mt-[78px] lg:mt-[85px] h-auto w-full  lg:w-[calc(100%-296px)] ml-0 sm:ml-auto'>

    <Add_airplane open2={open2} setOpen2={setOpen2}/>
    <Update_airplane open={open}  setOpen={setOpen} airplane_info={airplane_info} model={model} setModel={setModel} manufacturer={manufacturer} setManufacturer={setManufacturer} range={range} setRange={setRange}
    />
     {/* delete airplane */}
    <Modal open={open1} setOpen={setOpen1}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to delete <span className='font-extrabold text-secoundary_color/80'>{data?.model}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelDeleteAirplane(data?.id)} color={"#cf2e2e"} padding='5px'>Delete</Button>
            <Button onClick={()=>setOpen1(!open1)} color={"#777"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal>

           {/* activate airpalne */}
 
            <Modal open={open8} setOpen={setOpen8}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to activate <span className='font-extrabold text-secoundary_color/80'>{data?.model}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelActiveAirplane(data?.id)} color={"#00d084"} padding='5px'>Activation</Button>
            <Button onClick={()=>setOpen8(!open8)} color={"#777"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
            </Modal>

           {/* add class */}
           <Modal open={open5} setOpen={setOpen5}>
           
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            
            <div className='flex flex-col justify-center items-center gap-1'>
            <div className='border-b-2 border-solid border-primary_color w-fit mx-auto mb-3'>
            <Headings element={"h3"} color='#00529B' >add class</Headings>
            </div>
            <div className="relative z-0 w-full mb-1 lg:mb-4 group flex justify-between items-center flex-col">
             <span className='text-[12px] md:text-[16px] text-primary_color_1 pr-2'>Class name</span>

            <select name="class" defaultValue={"class"} className='bg-white p-4 text-center text-secoundary_color w-[190px] lg:w-[350px] rounded-2xl text-[12px] md:text-[16px] font-bold border-primary_color border-solid border-b-2 select_option' value={class_name} onChange={(e)=>setClass_name(e.target.value)}>
                <option value={"class"} disabled>Select...</option>
                <option value={"Economy"}>Economy</option>
                <option value={"Business"}>Business</option>
            </select>
             </div>
            <div className="relative z-0 w-full mb-1 lg:mb-4 group">
            <input type="number" value={price_rate} onChange={(e)=>setPrice_rate(e.target.value)}  name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price rate</label>
            </div>
            <div className="relative z-0 w-full mb-1 lg:mb-4 group">
            <input type="number" value={cabin_weight} onChange={(e)=>setCabin_weight(e.target.value)}  name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cabin weight</label>
            </div>
            <div className="relative z-0 w-full mb-1 lg:mb-4 group">
            <input type="number" value={weight_allowed} onChange={(e)=>setWeight_allowed(e.target.value)}  name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Weight allowed</label>
            </div>
            <div className="relative z-0 w-full mb-1 lg:mb-4 group">
            <input type="number" value={number_of_meals} onChange={(e)=>setNumber_of_meals(e.target.value)}  name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number of meals</label>
            </div>
            <div className='flex gap-3'>
            <Button  onClick={handelAddClass} color={"#00529B"} padding='5px'>Create</Button>
            </div>
           
            </div>

            </div>
            
           </Modal>
            {/* update class */}
            <Modal open={open6} setOpen={setOpen6}>
           <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
           
           <div className='flex flex-col justify-center items-center gap-1'>
           <div className='border-b-2 border-solid border-primary_color w-fit mx-auto mb-3'>
            <Headings element={"h3"} color='#00529B' >edit class</Headings>
            </div>
           <div className=" relative z-0 w-full mb-1 lg:mb-4 group flex justify-between items-center flex-col">
            <span className='text-[12px] md:text-[16px] text-primary_color_1 pr-2'>Class name</span>

           <select disabled name="class" defaultValue={"class"} className='bg-white p-4 text-center text-secoundary_color w-[190px] lg:w-[350px] rounded-2xl text-[12px] md:text-[16px] font-bold border-primary_color border-solid border-b-2 select_option' value={class_name} onChange={(e)=>setClass_name(e.target.value)}>
               <option value={"class"} disabled>Select...</option>
               <option value={"Economy"}>Economy</option>
               <option value={"Business"}>Business</option>
           </select>
            </div>
           <div className="relative z-0 w-full mb-1 lg:mb-4 group">
           <input type="number" value={price_rate} onChange={(e)=>setPrice_rate(e.target.value)}  name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
           <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price rate</label>
           </div>
           <div className="relative z-0 w-full mb-1 lg:mb-4 group">
            <input type="number" value={cabin_weight} onChange={(e)=>setCabin_weight(e.target.value)}  name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cabin weight</label>
            </div>
           <div className="relative z-0 w-full mb-1 lg:mb-4 group">
           <input type="number" value={weight_allowed} onChange={(e)=>setWeight_allowed(e.target.value)}  name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
           <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Weight allowed</label>
           </div>
           <div className="relative z-0 w-full mb-1 lg:mb-4 group">
           <input type="number" value={number_of_meals} onChange={(e)=>setNumber_of_meals(e.target.value)}  name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
           <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number of meals</label>
           </div>
           <div className='flex gap-3'>
           <Button  onClick={handelUpdateClass} color={"#00529B"} padding='5px'>Update</Button>
           </div>
          
           </div>

           </div>
           
          </Modal>

           {/* delete class */}
           <Modal open={open7} setOpen={setOpen7}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to delete <span className='font-extrabold text-secoundary_color/80'>{data?.name}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelDeleteClass(data?.id)} color={"#cf2e2e"} padding='5px'>Delete</Button>
            <Button onClick={()=>setOpen7(!open7)} color={"#777"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal>

           {/* class */}
           <LargeModal open={open4} setOpen={setOpen4}>
            <div className=" flex items-center justify-center gap-5 flex-col py-[5px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <Headings element={"h1"}>airplane classes</Headings>

            <div className='flex justify-evenly items-center w-full gap-3 flex-col md:flex-row bg-black/10 py-2'>
                    <div className='flex flex-col items-center justify-center'>
                    <span className='text-[16px] font-semibold text-secoundary_color_1 border-b-4 border-dotted border-primary_color'>model</span>
                    <Headings element={"p"} color_P='#000'>{airplane_info?.data?.model}</Headings>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                    <span className='text-[16px] font-semibold text-secoundary_color_1 border-b-4 border-dotted border-primary_color'>manufacturer</span>
                    <Headings element={"p"} color_P='#000'>{airplane_info?.data?.manufacturer}</Headings>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                    <span className='text-[16px] font-semibold text-secoundary_color_1 border-b-4 border-dotted border-primary_color'>range</span>
                    <Headings element={"p"} color_P='#000'>{airplane_info?.data?.range}</Headings>
                    </div>
                  {airplane_info?.data?.classes[1] == null ?   <div className="relative">
                    <div className="shadow-xl shadow-black_color/40 rounded-xl border-[1px] border-solid border-white/30">
                    <Button onClick={()=>{setOpen5(true)}} padding='4px'> <FontAwesomeIcon icon={faPlus} className='text-[20px] font-bold text-primary_color/80 pr-2'/><span className='text-secoundary_color_1 font-semibold'>Add class</span></Button>
                    </div>
                   </div>: null}
                   </div>
            <div className='flex  justify-center items-center gap-6 w-full flex-col md:flex-row'>
           
            {
              airplane_info?.data?.classes[0] != null ?  airplane_info?.data?.classes?.map(Class=>{
                return (
                  <div key={Class?.class_id} className='bg-black/5 basis-[300px] p-2 rounded-xl shadow-black_color shadow-xl'>
                  <div className="grid md:grid-cols-1 md:gap-6 w-full">
                   <div className="relative z-0 w-full mb-1 lg:mb-4 group">
                   <p className='font-bold text-white bg-gray_color p-2'>{Class?.class_name}</p>

                   </div></div>

                   <div className="grid md:grid-cols-1 md:gap-6 w-full bg-white px-2">
                   <div className="relative z-0 w-full mb-1  group flex items-center justify-between border-b-2 border-dashed border-primary_color">
                   <span className='text-secoundary_color font-bold'>Price rate </span>
                   <p className='font-bold text-black_color/60 bg-black_color/5 rounded-xl  p-2'>{Class?.price_rate} $</p>

                   </div></div>
                   <div className="grid md:grid-cols-1 md:gap-6 w-full bg-white px-2">
                   <div className="relative z-0 w-full mb-1  group flex items-center justify-between border-b-2 border-dashed border-primary_color">
                   <span className='text-secoundary_color font-bold'>Number of meals </span>
                   <p className='font-bold text-black_color/60 bg-black_color/5 rounded-xl  p-2'>{Class?.number_of_meals}</p>

                   </div></div>

                   <div className="grid md:grid-cols-1 md:gap-6 w-full bg-white px-2">
                   <div className="relative z-0 w-full mb-1  group flex items-center justify-between border-b-2 border-dashed border-primary_color">
                   <span className='text-secoundary_color font-bold'>Cabin weight </span>
                   <p className='font-bold text-black_color/60 bg-black_color/5 rounded-xl  p-2'>{Class?.cabin_weight} kg</p>

                   </div></div>

                   <div className="grid md:grid-cols-1 md:gap-6 w-full bg-white px-2 ">
                   <div className="relative z-0 w-full mb-1  group flex items-center justify-between border-b-2 border-dashed border-primary_color">
                   <span className='text-secoundary_color font-bold'>Weight allowed </span>
                   <p className='font-bold text-black_color/60 bg-black_color/5 rounded-xl  p-2'>{Class?.weight_allowed} kg</p>

                   </div></div>

                   <div className="grid md:grid-cols-1 md:gap-6 w-full bg-white px-2 ">
                   <div className="relative z-0 w-full mb-1  group flex items-center justify-between border-b-2 border-dashed border-primary_color">
                   <span className='text-secoundary_color font-bold'>Number of seats </span>
                   <p className='font-bold text-black_color/60 bg-black_color/5 rounded-xl  p-2'>{Class?.number_of_seats}</p>

                   </div></div>


                   <div className="grid md:grid-cols-1 md:gap-6 w-full bg-black/5 px-2 ">
                   <div className="relative z-0 w-full group flex items-center justify-center gap-2">
                   <span className='text-secoundary_color bg-slate-50 w-full font-bold p-1 m-1 text-center rounded-xl'><Button onClick={()=>{setOpen7(true); setData({id:Class?.class_id,name:Class?.class_name}) }}   color={"#ae8a3b"} padding='8px'><FontAwesomeIcon icon={faTrashCan} /></Button> </span>
                   <p className='font-bold text-black_color/60 w-full bg-slate-50 m-1 p-1 text-center rounded-xl'><Button onClick={()=>{setOpen6(true);fillDatainClass(Class?.class_id)}} color={"#00529B"} padding='8px'><FontAwesomeIcon icon={faPenToSquare} /></Button></p>

                   </div></div>

                  </div>
                )
              }
              
              ): <div className=" w-fit rounded-xl bg-secoundary_color m-auto">
                   <div className="relative z-0 w-full mb-1 lg:mb-4 group text-center  p-3">
                   <span className='text-white font-bold p-4 text-center'>There are no classes <FontAwesomeIcon icon={faFolderOpen} className='px-2'/></span>
                   
                   </div></div>
            }
            
            <div className='flex gap-3'>
            </div>
           
            </div>

            </div>
           </LargeModal>
    


    <div className='h-auto bg-gradient-to-t  p-2 md:p-8 w-full '>
    <div className="flex items-center justify-between flex-column p-4 flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 rounded-t-2xl  bg-black/20">
    <div className='text-left'>
    <Headings element={"h3"}>manage airplanes</Headings>
    </div>
    <div className="relative">
        <div className="shadow-xl shadow-black_color/40 rounded-xl border-[1px] border-solid border-white/30">
        <Button onClick={()=>{setOpen2(true);}}> <FontAwesomeIcon icon={faPlus} className='text-[20px] font-bold text-primary_color/80 pr-2'/>Add airplane</Button>
        </div>
    </div>

   
</div>
  <div className="relative overflow-x-auto   shadow-2xl shadow-black_color/50  lg:rounded-b-lg">

  <table className="w-full text-sm text-left rtl:text-right text-gray-900 relative">
    <thead className="text-xs text-primary_color uppercase  bg-secoundary_color_1 ">
        <tr>
            
            <th scope="col" className="px-6 py-3">
                Model
            </th>
            <th scope="col" className="px-6 py-3">
             Manufacturer
            </th>
            <th scope="col" className="px-6 py-3">
                Range
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
          airplanes?.data?.data?.map((airplane)=>{
            return (
                <tr key={airplane?.airplane_id} className="bg-white_color/80 border-b  border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">
        <td scope="row" className="flex items-center px-6 py-10 text-primary_color_1 whitespace-nowrap ">
            <div className="ps-3">
                <div className="text-base">{airplane?.model}</div>
                
            </div>  
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-base text-primary_color_1"> 
          {airplane?.manufacturer}
          </div>
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-base text-primary_color_1"> 
          {airplane?.range}
          </div>
        </div>
        </td>
        <td className="px-6 py-2">
            <div className="flex items-center">
            {airplane?.deleted_at == null ?<> <div className="h-2.5 w-2.5 rounded-full bg-green-400 me-2"></div> Active</>:<><div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div> Inactive</>}
            </div>
        </td>
        <td className=" text-center  align-middle">
           {
            airplane?.deleted_at == null ?<button  onClick={()=>{setOpen1(true);setData({id:airplane?.airplane_id,model:airplane?.model})}} className="font-bold text-[22px] m-2 text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
            <FontAwesomeIcon icon={faTrashCan} />
            </button>:
            <button onClick={()=>{setOpen8(true);setData({id:airplane?.airplane_id,model:airplane?.model})}} className="font-bold text-[22px] text-green_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faReply} />

            </button>
           } 
           {
            airplane?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] m-2 text-secoundary_color/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} /></button>:
            <button onClick={()=>{setOpen(true); get_AirPlane_Info(airplane?.airplane_id)}} className="font-bold text-[20px] text-secoundary_color/80  m-2  hover:underline">
            <FontAwesomeIcon icon={faPenToSquare} />
            </button>
           } 
           {
            airplane?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] m-2 text-primary_color_1/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
            <FontAwesomeIcon icon={faEye} /></button>:
            <button onClick={()=>{setOpen4(true); get_AirPlane_Info(airplane?.airplane_id)}} className="font-bold text-[20px] text-primary_color_1/80  m-2  hover:underline">
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

  </div>
    </div>
    </div>
  )
}

export default Manage_airplanes