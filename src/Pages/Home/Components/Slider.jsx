import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Controller, EffectCoverflow, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css/effect-fade';
import Loading4 from '../../../Components/Loading/Loading4';
import 'swiper/css';
// import 'swiper/css/navigation';
import "./Responsibilty.css"
import Headings from '../../../Components/Headings/Headings';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecommendations } from '../../../Redux/ApiSlices/authSlice';
import { faClock, faFaceSmileBeam, faHashtag, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Slider = () => {
    const {user,recommend,error,isLoading,location}=useSelector(state=>state.auth);
    
    const country="Syria";
    console.log("location",location);
    const dispatch=useDispatch();

    useEffect(()=>{
      
      navigator.geolocation.getCurrentPosition(async(position)=>{
        const{latitude,longitude}=position.coords;
        let Url=`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        try{
          const res= await axios.get(Url);
          // setData(res?.data?.address?.country);
          // setLocation(res?.data?.address?.country)
        }
        catch(err){
          console.log(err)
        }
          
         
      })
        
      },[]);
    useEffect(()=>{
      const data={id:user?.data?.user?.passenger?.passenger_id,country:country}
      dispatch(getUserRecommendations(data))
    },[]); 
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
    

   {
    isLoading ? <div className="xl:flex justify-center items-center hidden  w-full"><Loading4/></div>:
   <Swiper
        effect={'coverflow'}
        grabCursor={true}
        spaceBetween={200}
        centeredSlides={true}
        autoHeight={true}
        slidesPerView={3}
          coverflowEffect={{
          rotate: 0,
          stretch: 20,
          depth: 900,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={pagination}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper hidden xl:flex lg:flex-col"
      >
  {recommend?.recommendations?.map((el,index) => (
    <SwiperSlide key={index} className='relative bg-black/15 flex flex-col justify-center items-center shadow-xl shadow-secoundary_color'>
    <p className='bg-secoundary_color/90 text-white text-center w-full border-b-2 border-solid border-primary_color py-1 '>{"Economy"}</p>

     <img src={`http://127.0.0.1:8000${el?.image}`}  className='w-full h-[200px]'/>
      <div className='flex  flex-col w-full bg-white'>
      <div className='flex justify-center items-center gap-3'>
        <p className=' text-secoundary_color_1 bg-white text-center w-full border-b-2 border-solid border-primary_color py-1 '>{el?.arrival_country}</p>
        <p className=' text-secoundary_color_1 bg-white text-center w-full border-b-2 border-solid border-primary_color py-1 '>{el?.price}$</p>
        </div>
        <div className='flex justify-center items-center gap-3'>
        <p className=' text-secoundary_color_1 bg-white text-center text-[12px] w-full border-b-2 border-solid border-primary_color py-1 text-nowrap'>{el?.arrival_city}</p>
        <p className=' text-secoundary_color_1 bg-white text-center text-[12px] w-full border-b-2 border-solid border-primary_color py-1 text-nowrap'>{el?.weight_allowed}</p>
        </div>
        <div className='flex justify-center items-center gap-3'>
        <p className=' text-secoundary_color_1 bg-white text-center  text-[12px] w-full  py-1 '><FontAwesomeIcon icon={faPlaneDeparture} className='px-2 text-[20px] text-secoundary_color'/>{el?.departure_datetime}</p>
        <p className=' text-secoundary_color_1 bg-white text-center text-[12px] w-full   py-4 '><FontAwesomeIcon icon={faClock} className='px-2 text-[20px] text-secoundary_color'/>{el?.duration}</p></div>
      </div>
    </SwiperSlide>
  ))}
  
</Swiper>}
{
  isLoading ? <div className="flex justify-center xl:hidden items-center w-full"><Loading4/></div>:
  <div className='flex w-[80%] mx-auto justify-evenly xl:hidden  gap-5 items-center flex-wrap  p-2'>
      {
        recommend?.recommendations?.map((el,index) => (
    <div key={index} className='relative bg-black/15 !w-[180px] sm:!w-[220px] md:!w-[280px]  flex flex-col justify-center items-center shadow-xl shadow-secoundary_color'>
    <p className='bg-secoundary_color/90 text-white text-center w-full border-b-2 border-solid border-primary_color py-1 '>{"Economy"}</p>

      <img src={`http://127.0.0.1:8000${el?.image}`}  className='w-full h-[200px]'/>
      <div className='flex  flex-col w-full bg-white'>
      <div className='flex justify-center items-center gap-3'>
        <p className=' text-secoundary_color_1 bg-white text-center w-full border-b-2 border-solid border-primary_color py-1 '>To {el?.arrival_country}</p>
        <p className=' text-secoundary_color_1 bg-white text-center w-full border-b-2 border-solid border-primary_color py-1 '>{el?.price}$</p>
        </div>
        <div className='flex justify-center items-center gap-3'>
        <p className=' text-secoundary_color_1 bg-white text-center text-[12px] w-full border-b-2 border-solid border-primary_color py-1 text-nowrap'>{el?.arrival_city}</p>
        <p className=' text-secoundary_color_1 bg-white text-center text-[12px] w-full border-b-2 border-solid border-primary_color py-1 text-nowrap'>{el?.weight_allowed}</p>
        </div>
        <div className='flex justify-center items-center gap-3'>
        <p className=' text-secoundary_color_1 bg-white text-center text-[12px] w-full  py-1 '><FontAwesomeIcon icon={faPlaneDeparture} className='px-2 text-[17px] md:text-[20px] text-secoundary_color'/>{el?.departure_datetime}</p>
        <p className=' text-secoundary_color_1 bg-white text-center text-[12px] w-full  py-4 '><FontAwesomeIcon icon={faClock} className='px-2 text-[17px] md:text-[20px] text-secoundary_color'/>{el?.duration}</p></div>
      </div>
    </div>
  ))
      }
    </div>
}

   </div>

  )
}

export default Slider


