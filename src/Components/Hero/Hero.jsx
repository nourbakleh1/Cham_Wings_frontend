import { Carousel } from 'flowbite-react';
import React from 'react';



const Hero = () => {
  return (
<div className='bg-black_color wow  rotateInDownLeft' >
<div data-wow-delay={".4s"} className="wow  rotateInDownLeft h-[300px] sm:h-[350px] md:h-[400px] xl:h-[500px] 2xl:h-[600px]">

      <Carousel pauseOnHover slideInterval={5000}>
        <img className='bg-cover object-cover h-full' src="/assets/images/Hero_images/hero-1.jpg" alt="..." />
        <img className='bg-cover object-cover h-full' src="/assets/images/Hero_images/hero-2.jpg" alt="..." />
        <img className='bg-cover object-cover h-full' src="/assets/images/Hero_images/hero-3.jpg" alt="..." />
        <img className='bg-cover object-cover h-full' src="/assets/images/Hero_images/hero-4.jpg" alt="..." />
        <img className='bg-cover object-cover h-full' src="/assets/images/Hero_images/hero-5.jpg" alt="..." />
        <img className='bg-cover object-cover h-full' src="/assets/images/Hero_images/hero-6.jpg" alt="..." />
        <img className='bg-cover object-cover h-full' src="/assets/images/Hero_images/hero-7.jpg" alt="..." />
        <img className='bg-cover object-cover h-full' src="/assets/images/Hero_images/hero-8.jpg" alt="..." />
        <img className='bg-cover object-cover h-full' src="/assets/images/Hero_images/hero-9.jpg" alt="..." />
        
      </Carousel>
    </div>
</div>
  )
}

export default Hero;