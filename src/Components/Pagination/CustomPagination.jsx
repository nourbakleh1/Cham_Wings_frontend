import React from 'react'
import "./Custom.css"

const CustomPagination = ({page,setPage,totalElement,perPage=15,isLoading}) => {
    const number= Math.ceil(totalElement / perPage);

    const Narray=[];
    for(let i =1 ; i<=number;i++){
        Narray.push(i)
    }


  return (
    <nav aria-label="Page navigation example" className='w-full items-center  flex p-5 scrollll overflow-x-auto justify-start '>
        {isLoading ? "":
          <ul className="inline-flex -space-x-px text-base h-8 border-0 outline-none  w-[100px]">
    <li>
      <button  onClick={()=>setPage(page - 1)} disabled= {page == 1} className= {`flex items-center justify-center px-2 h-8 shadow-xl shadow-black_color/40 ms-0 disabled:cursor-not-allowed leading-tight text-secoundary_color_1/80 bg-black/20  rounded-s-lg hover:bg-primary_color_1 hover:text-white_color `}>Prev</button>
    </li>
    {
        Narray?.map((el)=>{
        return <li key={el}>
         <button onClick={()=>setPage(el)} className={page == el ? `active_page`: "" +"mx-1 flex items-center justify-center px-2 h-8 shadow-xl shadow-black_color/40 leading-tight text-secoundary_color_1/80 bg-secoundary_color_1/20 rounded-md  hover:bg-primary_color_1 hover:text-white_color"}>{el}</button>
         </li>
      })
    }
    
    
    <li>
      <button onClick={()=>setPage(page + 1)} disabled={Narray.length == page} className="flex items-center justify-center px-2 h-8 disabled:cursor-not-allowed shadow-xl shadow-black_color/40 leading-tight text-secoundary_color_1/80 bg-black/20  rounded-e-lg hover:bg-primary_color_1 hover:text-white_color  ">Next</button>
    </li>
  </ul>}

    </nav>
  )
}

export default CustomPagination