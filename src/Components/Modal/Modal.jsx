import React from 'react'

const Modal = ({open,setOpen,children}) => {
  return (
    <>
    {
      open &&
      <div id="popup-modal"  tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 bottom-0 left-0 bg-black_color/30 flex justify-center items-center  z-50  w-full  max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className=" relative top-[40%] bg-white rounded-lg flex justify-center items-center shadow">
            <button onClick={()=>setOpen(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 z-[99999999] hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center cursor-pointer items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            {children}
        </div>
    </div>
</div>
    }

    </>
  )
}

export default Modal