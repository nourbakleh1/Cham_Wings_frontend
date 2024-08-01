import { faBox, faChartPie, faChevronLeft, faCircleInfo, faCircleMinus, faFileCirclePlus, faFilePdf, faFilePen, faInfo, faListCheck, faMessage, faMinus, faNewspaper, faPersonWalkingArrowLoopLeft, faPlane, faPlus, faRightFromBracket, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./Sidbar.css"
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Headings from '../Headings/Headings';
import { useDispatch, useSelector } from 'react-redux';
import { deletePdf, getpdfs, uploadPdf } from '../../Redux/ApiSlices/chatbotSlice';
import { toast } from 'react-toastify';
import Loading1 from '../Loading/Loading1';

const Sidbar = (displaySidebar,setDisplaySidebar) => {
   const dispatch=useDispatch();
   const {Pdf_file,Pdf_file_sorted,isLoading,error}=useSelector((state)=>{return state.chatbot});
      const [openpdf,setOpenpdf]=useState(false);
      const [open,setOpen]=useState(false);
      const [open1,setOpen1]=useState(false);

      const [file,setFile]=useState(null);
    const handelSide=()=>{
      document.getElementById("three").classList.add("hidden");
      document.getElementById("default-sidebar").classList.remove("-translate-x-[110%]");
      
    }
    const [id,setId]=useState(0);
    const closeSide=()=>{
      document.getElementById("three").classList.remove("hidden");
      document.getElementById("default-sidebar").classList.add("-translate-x-[110%]");
    }

    useEffect(()=>{
      dispatch(getpdfs());
    },[]);

    const Loading= <Loading1/>

    const handelPDF=(e)=>{
      e.preventDefault();
      if(!file){
         return toast.error("File is required")
      }
      const formdata=new FormData();
      formdata.append('pdf',file);
      dispatch(uploadPdf(formdata)).unwrap().then((res)=>{
         setOpen(!open);
         setFile(null);
         return toast.success(res.message)
      }).catch((rej)=>{
         setFile(null);
         if(rej?.response?.status == 409){
            return toast.error(rej?.response?.data?.error)
         }
         if(rej?.response?.status == 422)
         return toast.error(rej?.response?.data?.message)
        if(rej?.response?.status == 500){
         return toast.error(rej?.response?.data?.error)
        }
      })
    }

    const handelDeletePdf=(id)=>{
      dispatch(deletePdf(id)).unwrap().then((res)=>{
         setOpen1(!open1)
         return toast.success(res.data.message)
      }).catch((rej)=>{
        return toast.error(rej)
      })
    }
  return (
    
    <>

    <button id={"three"} onClick={handelSide} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="fixed top-[10%] left-[0] p-2 mt-2 ms-3 text-sm  z-[500] text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

    
        <aside id="default-sidebar" className="fixed top-[70px] md:top-[65px] lg:top-[70px]  left-0 transition-transform sm:translate-x-0 -translate-x-[110%] z-[40] w-44 sm:w-[276px] lg:w-[320px] h-screen " aria-label="Sidebar">
        <FontAwesomeIcon onClick={closeSide} icon={faChevronLeft} className='absolute top-[20%] left-[100%]  sm:hidden text-[20px] text-white_color bg-secoundary_color'/>
   <div className="h-full px-1 sm:px-3 py-4 w-[190px] sm:w-[256px]  overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
         <li>
            <NavLink end to="/dashboard/employee" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FontAwesomeIcon icon={faChartPie} />
               <span className="ms-3 text-[11px] md:text-[14px]">Dashboard</span>
            </NavLink>
         </li>
         <li>
         <NavLink end to="/dashboard/employee/chatbot_emp" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <FontAwesomeIcon icon={faWrench} />
                   
                  <span className="flex-1  ms-3 text-left rtl:text-right whitespace-nowrap  text-[11px] md:text-[14px]">Emp chatBot files</span>
                  <svg onClick={()=>setOpenpdf(!openpdf)}  className="mr-2 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
                  <FontAwesomeIcon icon={faPlus} onClick={()=>{setOpen(!open);dispatch(getpdfs())}}/>
                  </NavLink>
                  
                  
                      
                  
         {openpdf &&
            <ul id="dropdown-example" className="p-2 space-y-2">
            {Pdf_file_sorted?.map((el)=>{
               return (
                  <div key={el.id}>
                  <li className='flex gap-3 sm:gap-0 justify-center sm:justify-evenly items-center text-[11px] md:text-[14px] border-primary_color/40 border-b-2 border-solid' >
                  <FontAwesomeIcon icon={faFilePdf} className='text-off_white'/>

                     <span  className="flex items-center text-[12px] w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-4 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">{el.filename.slice(0,20)}</span>
                     <FontAwesomeIcon icon={faMinus} className='text-off_white cursor-pointer' onClick={()=>{ setOpen1(!open1);setId(el.id)}} />

                  </li>
                 
                  </div>

               )
            })}
           
                 
            </ul>}
            
         </li>
         <Modal open={open} setOpen={setOpen}>
        <div className=" flex items-center justify-center py-0 px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
	
	<div className="sm:max-w-lg w-full p-1 rounded-xl z-10">
		<div className="text-center">
			<h2 className="mt-3 text-lg sm:text-2xl font-bold text-gray-900">
				File Upload!
			</h2>
		</div>
        <form className="mt-3 space-y-3" onSubmit={handelPDF}>
                    
                    <div className="grid grid-cols-1 space-y-1">
                                    <label className="text-sm text-center font-bold text-primary_color mb-3 tracking-wide">Attach Document</label>
                        <div className="flex items-center justify-center w-full relative">
                        {file && <FontAwesomeIcon icon={faCircleMinus} className='text-red-400 text-[25px] absolute top-[-10px] right-[-10px]' onClick={()=>setFile(null)}/>}
                            <label htmlFor='upload' className="flex flex-col rounded-lg border-4 border-dashed w-full h-30 p-5 group text-center">
                                <div className="h-full w-full text-center flex flex-col items-center justify-center   ">
                                <FontAwesomeIcon icon={faFileCirclePlus} className='text-[25px] text-secoundary_color_1 mb-2'/>
                                {file ?  <p className='w-[200px] bg-primary_color rounded-xl text-white text-[12px] px-1 py-2 overflow-hidden text-ellipsis'>{file.name} </p>   :<p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <span className="text-blue-600 hover:underline">select a file</span> from your computer</p>}
                                    
                                </div>
                                
                            </label>
                            <input id='upload'
                              type="file"
                              className='hidden'
                              onChange={(e)=>setFile(e.target.files[0])}/>
                        </div>
                    </div>
                           
                    <div className='my-5 w-full flex justify-center p-4  rounded-full tracking-wide font-semibold  transition ease-in duration-300 '>
                        
                   {isLoading ?Loading:<Button onClick={handelPDF} color={"#000"}>upload</Button>} 
                    </div>
               </form>
	            </div>
            </div>
        </Modal>

        <Modal open={open1} setOpen={setOpen1}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold'>do you want to delete this{id}</p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelDeletePdf(id)} color={"#00529B"} padding='5px'>Delete</Button>
            <Button onClick={()=>setOpen1(!open1)} color={"#cf2e2e"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal>
        
         <li>
            <NavLink to="/dashboard/employee/manage-offers" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FontAwesomeIcon icon={faListCheck} />
               <span className="flex-1 ms-3 whitespace-nowrap text-[11px] md:text-[14px]">manage offers</span>
            </NavLink>
         </li>
         <li>
            <NavLink to="/dashboard/employee/reservation" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FontAwesomeIcon icon={faBox} />
               <span className="flex-1 ms-3 whitespace-nowrap text-[11px] md:text-[14px]">view reservations</span>
            </NavLink>
         </li>
         <li>
            <NavLink to="/dashboard/employee/manage-flights" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FontAwesomeIcon icon={faPlane} />
               
               <span className="flex-1 ms-3 whitespace-nowrap text-[11px] md:text-[14px]">manage flights</span>
            </NavLink>
         </li>
         <li>
            <NavLink to="/dashboard/employee/answer-questions" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FontAwesomeIcon icon={faMessage} />
               <span className="flex-1 ms-3 whitespace-nowrap text-[11px] md:text-[14px]">answer the questions</span>
            </NavLink>
         </li>
         <li>
            <NavLink to="/dashboard/employee/view-history" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FontAwesomeIcon icon={faNewspaper} />
               <span className="flex-1 ms-3 whitespace-nowrap text-[11px] md:text-[14px]">view modication history</span>
            </NavLink>
         </li>
         <li>
            <NavLink to="/dashboard/employee/visa-information" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FontAwesomeIcon icon={faCircleInfo} />
               <span className="flex-1 ms-3 whitespace-nowrap text-[11px] md:text-[14px]">visa and travel information</span>
            </NavLink>
         </li>
         <li>
            <NavLink to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FontAwesomeIcon icon={faPersonWalkingArrowLoopLeft} />
               <span className="flex-1 ms-3 whitespace-nowrap text-[11px] md:text-[14px]">return to the home page</span>
            </NavLink>
         </li>
         <li>
            <NavLink to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FontAwesomeIcon icon={faRightFromBracket} />
               <span className="flex-1 ms-3 whitespace-nowrap text-[11px] md:text-[14px]">sign out</span>
            </NavLink>
         </li>
      </ul>
   </div>
</aside>
    
    </>



  )
}

export default Sidbar