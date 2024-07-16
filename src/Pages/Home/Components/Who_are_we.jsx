import React from 'react';
import Headings from '../../../Components/Headings/Headings';

const Who_are_we = () => {
  return (
    <section className='bg-off_white flex justify-between items-center gap-10 p-1 md:p-5 flex-wrap md:flex-nowrap'>
    <div  className=' md:grow-[1] pt-[50px] px-0 md:px-[30px] text-center basis-[100%] md:basis-[400px]'>
    <Headings element={"h1"} color='#e8e8e8'>who are we</Headings>
    <div className='p-5'>
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
    <div  className='md:grow-[1] basis-[100%]  md:basis-[300px] bg-secoundary_color_1 p-3 rounded-lg hover:bg-primary_color_1 hover:p-4 transition-all delay-150'>
     {/* <iframe className='h-[200px] sm:h-[250px] lg:h-[350px]'  width="100%" 
      src="https://www.youtube.com/embed/mxF3A0zOzbk" title="Let's fly together!"
       allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin" 
      allowFullScreen={true}>
     </iframe> */}
    </div>
    </section>
  )
}

export default Who_are_we;