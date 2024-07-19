import React from 'react';

const Hero = ({img}) => {
  return (

<div className="h-[270px]  sm:h-[305px] md:h-[350px] xl:h-[400px] 2xl:h-[450px] mt-[40px] lg:mt-[70px] relative">

      
        <img className='bg-cover object-cover h-full w-full' src={img} alt="..." />
        <div className='absolute top-0 left-0 w-full h-full bg-[#0000007d] '></div>
      
    </div>

  )
}

export default Hero;