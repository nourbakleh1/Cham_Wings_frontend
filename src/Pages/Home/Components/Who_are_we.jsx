import React from 'react';
import Headings from '../../../Components/Headings/Headings';
import "./Responsibilty.css"

const Who_are_we = () => {
  return (
    <section className='bg-off_white py-[20px] lg:py-[100px] flex justify-between items-center gap-10 p-1 flex-wrap md:flex-nowrap'>
    <div  className=' md:grow-[1] px-0 md:px-[30px] text-center basis-[100%] md:basis-[400px]'>
    <Headings element={"h1"} color='#e8e8e8'>who are we</Headings>
    <div>
    <Headings element={"p"} color_P='#000'>
     Cham Wings Airlines, the first Syrian private airline company
     was established at the end of 2007 with a national capital, as one of the
     commercial Shammout group companies. Its establishment came as a result of the
     economic openness and the new laws came out at that time by the Syrian government
     as an encouragement to the private sector to 
     enter into the air transport field to meet the 
     growing necessities of the travel market.
     </Headings>
    </div>
     <Headings element={"h2"} color='#00529B'>Fly Beyond The Limits</Headings>
     <Headings element={"p"} color_P='#000'>16 Years in The Sky Flying Together</Headings>
    </div>
    <div  className='md:grow-[1/2] 2xl:grow-[1/3] m-auto text-center move-up   flex justify-center items-center  '>
      <img className='object-cover h-[200px] sm:h-[300px] w-[200px] sm:w-[350px] 2xl:w-[450px] ' src='/assets/images/pngwing.com.webp'/>
    </div>
    </section>
  )
}

export default Who_are_we;