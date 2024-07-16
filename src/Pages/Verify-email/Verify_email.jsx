import React from 'react';
import Headings from '../../Components/Headings/Headings';
import Button from '../../Components/Button/Button';
import { Link } from 'react-router-dom';

const Verify_email = () => {
  return (
    <section className='flex gap-[20px] justify-center items-center'>
        <div  className='m-auto text-center px-3  sm:px-0 mt-[110px]'>
        <Headings element={"h1"}>Congrats</Headings>
        <Headings element={"p"}>your account has been verified </Headings>
        
        <img  className=' m-auto w-[40px] mt-3' src='/assets/images/check-fill.svg'/>

        
        <img  className='max-w-[200px] lg:max-w-[300px] my-[20px]' src="/assets/images/verify_success.svg" alt="..."/>
        <div className='my-5'>
        <span >Please click here to</span>
        <Link to="/login" className='text-secoundary_color p-2 font-bold' >login</Link>
        </div>
        
        </div>
    </section>
  )
}

export default Verify_email;