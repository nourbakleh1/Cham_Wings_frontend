import React, { useEffect, useState } from 'react'
import "./Pagination.css"
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({page,setPage,totalElement,perPage=15}) => {
  const number= Math.ceil(totalElement / perPage);

  
 
  const handelPage=({selected})=>{
    
    setPage(selected+1)
  }
  return (
    <>
      <nav aria-label="Page navigation example" className='w-full items-center  flex p-5 scrollll'>
  {/* <ul className="inline-flex -space-x-px text-base h-8 border-0 outline-none ">
    <li>
      <button  onClick={()=>setPage(page - 1)} disabled= {page == 1} className= {`flex items-center justify-center px-2 h-8 shadow-xl shadow-black_color/40 ms-0 disabled:cursor-not-allowed leading-tight text-secoundary_color_1/80 bg-black/20  rounded-s-lg hover:bg-primary_color_1 hover:text-white_color `}>Prev</button>
    </li>
    {
      newArr?.map((el)=>{
        return <li key={el}>
         <button onClick={()=>setPage(el)} className={page == el ? `active_page`: "" +"flex items-center justify-center px-2 h-8 shadow-xl shadow-black_color/40 leading-tight text-secoundary_color_1/80 bg-black/20  hover:bg-primary_color_1 hover:text-white_color"}>{el}</button>
         </li>
      })
    }
    
    
    <li>
      <button onClick={()=>setPage(page + 1)} disabled={newArr.length == page} className="flex items-center justify-center px-2 h-8 disabled:cursor-not-allowed shadow-xl shadow-black_color/40 leading-tight text-secoundary_color_1/80 bg-black/20  rounded-e-lg hover:bg-primary_color_1 hover:text-white_color  ">Next</button>
    </li>
  </ul> */}
  <ReactPaginate
    breakLabel="*****"
    containerClassName={"conainerPAGE"}
    nextLabel={<FontAwesomeIcon icon={faForward} className='text-[20px]'/>}
    previousLabel={<FontAwesomeIcon icon={faBackward} className='text-[20px]'/>}
    pageCount={number}
    onPageChange={handelPage}
    activeClassName={"pageActive"}
    previousClassName={"pagePrev"}
    nextLinkClassName={"pageNext"}
    disabledClassName	={"disablePage"}
    pageLinkClassName={"pageclass"}
    initialPage={page}
  />
</nav>
    </>
  )
}

export default Pagination