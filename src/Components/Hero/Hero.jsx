import { Carousel } from 'flowbite-react';
import React from 'react';



const Hero = () => {
  return (

<div className="h-[150px] sm:h-[350px] xl:h-[500px] 2xl:h-[600px]">

      <Carousel pauseOnHover slideInterval={5000}>
        <img className='x' src="/assets/images/Hero_images/hero-1.jpg" alt="..." />
        <img className='x' src="/assets/images/Hero_images/hero-2.jpg" alt="..." />
        <img className='x' src="/assets/images/Hero_images/hero-3.jpg" alt="..." />
        <img className='x' src="/assets/images/Hero_images/hero-4.jpg" alt="..." />
        <img className='x' src="/assets/images/Hero_images/hero-5.jpg" alt="..." />
        <img className='x' src="/assets/images/Hero_images/hero-6.jpg" alt="..." />
        
      </Carousel>
    </div>

  )
}

export default Hero;