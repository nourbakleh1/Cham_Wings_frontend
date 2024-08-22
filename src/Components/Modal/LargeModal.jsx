import React from 'react'
import "./Modal.css"


const LargeModal = ({open,setOpen,children}) => {
  return (
    <>{
        open && 
 
 <div id="medium-modal"  tabIndex="-1" className=" absolute top-0 bottom-0 left-0 right-0 bg-black_color/40 z-50 p-4 overflow-x-hidden flex justify-center max-h-full">
    <div className="relative w-full max-w-lg max-h-full ">
        
        <div className="animate__animated animate__zoomInDown removeScroll fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[80%]  overflow-y-scroll xl:h-[82%] w-[80%]  mt-[100px] bg-white  shadow-2xl shadow-black">
            
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  
                </h3>
                <button onClick={()=>setOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="medium-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span  className="sr-only">Close modal</span>
                </button>
            </div>
            
            {children}
            
            
        </div>
    </div>
</div>
    }
       
    </>
  )
}

export default LargeModal