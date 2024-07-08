import React from 'react';
import "./Headings.css";
const Headings = ({element,children}) => {
  switch(element){
    case "h1":return <h1 className='style uppercase font-extrabold text-[18px] my-3 lg:text-[28px] m-auto w-fit'><span></span>{children}</h1>;
    case "h2": return<h2 className='font-bold sm:my-5 uppercase text-[16px] my-3 lg:text-[22px] m-auto w-fit'>{children}</h2>
    case "h3": return<h2 className='font-bold uppercase text-[14px] my-3 lg:text-[20px] m-auto w-fit'>{children}</h2>
    case "h4": return<h2 className='font-bold uppercase text-[12px] my-3 lg:text-[18px] m-auto w-fit'>{children}</h2>
    case "p" : return <p className='text-[12px] lg:text-[18px] text-gray_color'>{children}</p> 

  }
  return (
    {element}
  )
}

export default Headings;