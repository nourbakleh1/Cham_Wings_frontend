import React from 'react';
import "./Headings.css";
const Headings = ({element,children,color="#fff",color_P="#abb8c3"}) => {
  switch(element){
    case "h1":return <h1  className='style uppercase font-extrabold text-[14px] sm:text-[19px] my-3 lg:text-[28px] m-auto w-fit'><span style={{backgroundColor:color}}></span>{children}</h1>;
    case "h2": return<h2 style={{color:color}} className='font-bold sm:my-5 uppercase text-[16px] my-3 lg:text-[22px] m-auto w-fit'>{children}</h2>
    case "h3": return<h3 style={{color:color}} className='font-bold uppercase text-[14px] my-3 lg:text-[20px]  w-fit'>{children}</h3>
    case "h4": return<h4 className='font-bold uppercase text-[12px] my-3 lg:text-[18px] m-auto w-fit'>{children}</h4>
    case "p" : return <p style={{color:color_P}} className='text-[12px] lg:text-[18px] '>{children}</p> 

  }
  return (
    {element}
  )
}

export default Headings;