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
    <div  className='md:grow-[1] basis-[100%] text-center  md:basis-[300px] bg-secoundary_color_1 p-2 rounded-lg hover:bg-primary_color_1 hover:p-3 transition-all delay-150'>
      <Headings element={"p"} color_P='#fff'>Cham Wings Airline</Headings>
     <video className='xl:h-[370px]' width="100%" controls>
     <source src="/assets/videos/Let_s_fly_together!(360p).mp4" type="video/mp4"/>
     <source src="movie.ogg" type="video/ogg"/>
     Your browser does not support the video tag.
     </video>
     
    </div>
    </section>
  )
}

export default Who_are_we;