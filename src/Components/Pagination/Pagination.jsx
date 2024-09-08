import React from 'react'
import "./Pagination.css"
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({page,setPage,totalElement,perPage=15,isLoading}) => {
  const number= Math.ceil(totalElement / perPage);

  
 
  const handelPage=({selected})=>{
    
    setPage(selected)
  }
  return (
    <>
      <nav aria-label="Page navigation example" className='w-full items-center  flex p-5 scrollll'>
  
 {
  isLoading ? " ":<ReactPaginate
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
 } 
</nav>
    </>
  )
}

export default Pagination

