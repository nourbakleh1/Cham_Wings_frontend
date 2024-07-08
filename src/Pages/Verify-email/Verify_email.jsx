import React from 'react';
import Headings from '../../Components/Headings/Headings';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';

const Verify_email = () => {
    const navigate=useNavigate();
  return (
    <section className='flex gap-[20px] justify-center items-center'>
        <div className='m-auto text-center px-3  sm:px-0 mt-[100px]'>
        <Headings element={"h1"}>Congrats</Headings>
        <Headings element={"p"}>your account has been verified </Headings>
        
        <img className=' m-auto w-[40px] mt-5' src='/assets/images/check-fill.svg'/>

        
        <img className='max-w-[200px] sm:max-w-[400px] lg:max-w-[450px] mt-[50px]' src="/assets/images/verify_success.svg" alt="..."/>
        <p className='my-5'>Please click here to login</p>
        <Button onClick={()=>navigate('/login')} color={"#134571"}>Click</Button>
        </div>
    </section>
  )
}

export default Verify_email;