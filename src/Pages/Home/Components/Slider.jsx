import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Controller, EffectCoverflow, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css/effect-fade';

import 'swiper/css';
// import 'swiper/css/navigation';
import "./Responsibilty.css"
import Headings from '../../../Components/Headings/Headings';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecommendations } from '../../../Redux/ApiSlices/authSlice';
import { faFaceSmileBeam, faHashtag, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Slider = () => {
    const {user,recommend,error,isLoading}=useSelector(state=>state.auth);
    console.log((user?.data?.user?.user_id));
    console.log(recommend)
    const dispatch=useDispatch();

    useEffect(()=>{
      dispatch(getUserRecommendations(user?.data?.user?.user_id))
    },[]);
    const [image,setImage]=useState([
      {
        img:"/assets/images/Offers-images/offer-1.webp",
      }
      ,
      {
        img:"/assets/images/Offers-images/offer-2.webp",
      }
      ,{
        img:"/assets/images/Offers-images/offer-3.webp",
      },
      {
        img:"/assets/images/Offers-images/offer-4.webp",
      },
      {
        img:"/assets/images/Offers-images/offer-5.webp",
      }
      ,
      {
        img:"/assets/images/Offers-images/offer-2.webp",
      }
      ,{
        img:"/assets/images/Offers-images/offer-3.webp",
      },
      {
        img:"/assets/images/Offers-images/offer-4.webp",
      },
      {
        img:"/assets/images/Offers-images/offer-5.webp",
      }
    ])
    
      const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      };
    
  return (
    <div className='body'>
    <div className='text-center p-5'>
     <div className='border-b-4 border-solid border-brown_color mb-2 w-fit m-auto'><Headings element={"h1"} color='#000'>Make it an incredible journey</Headings></div>
     <div className='mb-12'><Headings element={"p"}>Explore the Chamwings experience and plan an unforgettable trip beyond your flight.</Headings></div>
     <div className='my-8 flex gap-4 flex-wrap justify-center items-center'><Headings element={"p"} color_P='#AE8A3B'>Recommended for you</Headings><FontAwesomeIcon icon={faFaceSmileBeam} className='text-[20px] rounded-full p-2 shadow-secoundary_color shadow-lg text-primary_color'/></div>
    </div>
    

    <Swiper
        effect={'coverflow'}
        grabCursor={true}
        spaceBetween={50}

        centeredSlides={true}
        autoHeight={true}
        slidesPerView={3}
          coverflowEffect={{
          rotate: 45,
          stretch: 10,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={pagination}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
  {recommend?.recommendations?.map((el) => (
    <SwiperSlide key={el?.flight_id} className='relative bg-black/15  flex flex-col justify-center items-center shadow-xl shadow-secoundary_color'>
    <p className='bg-secoundary_color/90 text-white text-center w-full border-b-2 border-solid border-primary_color py-1 '>{"Economy"}</p>

      <img src={`http://127.0.0.1:8000${el?.image}`} />
      <div className='flex  flex-col w-full'>
      <div className='flex justify-center items-center gap-3'>
        <p className=' text-secoundary_color_1 bg-white text-center w-full border-b-2 border-solid border-primary_color py-1 '><FontAwesomeIcon icon={faHashtag} />{el?.flight_number}</p>
        <p className=' text-secoundary_color_1 bg-white text-center w-full border-b-2 border-solid border-primary_color py-1 '>{el?.price}$</p>
        </div>
        <div className='flex justify-center items-center gap-3'>
        <p className=' text-secoundary_color_1 bg-white text-center w-full border-b-2 border-solid border-primary_color py-1 '><FontAwesomeIcon icon={faPlaneDeparture} className='px-2 text-[20px] text-secoundary_color'/>{el?.departure_date}</p>
        <p className=' text-secoundary_color_1 bg-white text-center w-full border-b-2 border-solid border-primary_color py-1 '><FontAwesomeIcon icon={faPlaneArrival} className='px-2 text-[20px] text-secoundary_color' />{el?.arrival_date}</p></div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
   </div>

  )
}

export default Slider

// {isLoading ? <Loading1/>: recommend?.recommendations?.map((image) => (
//   <SwiperSlide key={recommend?.flight_id}>
//     <img src={`http://127.0.0.1:8000${recommend?.image}`}/>
//   </SwiperSlide>
// ))}
