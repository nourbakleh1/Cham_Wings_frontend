import React from 'react';

const Headings = ({element,children}) => {
  switch(element){
    case "h1":return <h1 className='style font-extrabold text-[20px] lg:text-[32px] m-auto w-fit'><span></span>{children}</h1>
  }
  return (
    {element}
  )
}

export default Headings;