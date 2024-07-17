import { faBox, faChartPie, faChevronLeft, faCircleInfo, faFilePen, faInfo, faListCheck, faMessage, faNewspaper, faPersonWalkingArrowLoopLeft, faPlane, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Sidbar.css"

const Sidbar = (displaySidebar,setDisplaySidebar) => {
   
    const handelSide=()=>{
      document.getElementById("three").classList.add("hidden");
      document.getElementById("default-sidebar").classList.remove("-translate-x-[110%]");
      
    }
    const closeSide=()=>{
      document.getElementById("three").classList.remove("hidden");
      document.getElementById("default-sidebar").classList.add("-translate-x-[110%]");

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