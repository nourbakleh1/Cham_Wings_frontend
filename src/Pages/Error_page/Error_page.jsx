import React from 'react'
import Headings from '../../Components/Headings/Headings';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';

const Error_page = () => {
  const naigate=useNavigate();
  return (
    <div className='wow  swing flex justify-center max-w-full mt-[50px] h-screen'>
    <div className='px-3 sm:px-0 text-center'>
        <Headings element={"h1"}>UH-OH...</Headings>
        <Headings element={"p"} >the page you are looking for my have been moved , deleted, or possibly never existed.</Headings>

        <img data-wow-iteration="20" data-wow-duration="6s" className='wow bounceIn max-w-[200px] sm:max-w-[400px] lg:max-w-[550px] m-auto  mt-[50px]' src='/assets/images/page_not_found.svg' alt="not found"/>

        <div data-wow-duration="3s" className='wow  swing max-w-full flex justify-center mt-[50px]'>
        <Button color="#abb8c3" onClick={()=>naigate(-1)}>go back</Button>
        </div>

    </div>
    </div>
    
  )
}

export default Error_page;