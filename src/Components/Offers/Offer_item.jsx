import React from 'react'
import Headings from '../Headings/Headings';
import "./Offer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlane, faPlaneArrival, faPlaneDeparture, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { clearResultSearch, clearSelectedFlights, searchFlights, searchFlights_offer } from '../../Redux/ApiSlices/flightSlice';
import { useNavigate } from 'react-router-dom';
import useDateFormat from '../../utilities/useDateFormat';
import { toast } from 'react-toastify';

const Offer_item = ({offer}) => {
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const [booking_preference,setBooking_preference]=useState("b");
    const[trip_type,setTrip_type]=useState(0);
    const [adults,setAdults]=useState(0);
    const [infants,setInfants]=useState(0);
    const [departure_airport,setDeparture_airport]=useState(null);
    const [arrival_airport,setArrival_airport]=useState(null);
    const [start_date,setStartDate]=useState(null);
    const [end_date,setEndDate]=useState(null);
    // console.log("departure_airport",departure_airport)
    // console.log("arrival_airport",arrival_airport)

    const ChangeValue=(dep,arr,start_date,end_date)=>{
      setDeparture_airport(dep);
      setArrival_airport(arr);
      setStartDate(start_date);
      setEndDate(end_date)
    }
  const Discover_Offer=()=>{
            dispatch(clearResultSearch());
    if(booking_preference == "a" || booking_preference == "c"){
      if(adults == null){
          return toast.error("Companions is required")
      }
  }
  const data={
    trip_type:parseInt(trip_type),adults,infants,booking_preference,
    departure_airport:departure_airport,arrival_airport:arrival_airport,start_date:useDateFormat(start_date),
    end_date:useDateFormat(end_date)
 }
 console.log(data)
      dispatch((searchFlights_offer(data))).unwrap().then((res)=>{
        navigate('/flight');
      }).catch((rej)=>{
        return toast.error(rej?.response?.data?.message)
      })
  }
  return (
    <>
        <section className='overflow-hidden shadow-black shadow-2xl basis-[380px] gap-20 bg-white_color z-10 rounded-2xl hover:shadow-2xl transition-all delay-200'>
        <div className='parent-img relative'>
        <img className='imageOffer h-[320px] object-cover  w-full   z-10' src={`http://127.0.0.1:8000/${offer?.image}`} title={`${offer?.title}\n\n${offer?.description}`}/>
        <div className='absolute top-0 left-[50%] translate-x-[-50%] flex justify-center items-center bg-black/30'>
          <p className='text-white pl-1  pr-5'>#{offer?.flight?.flight_number}</p>

          <div className='flex justify-center px-2 sm:justify-start gap-2 items-center z-10' title={offer?.flight?.departure_airport?.airport_name}>
          <FontAwesomeIcon icon={faPlaneDeparture} className='text-white text-[11px]  sm:text-[15px]'/>
            <Headings element={"p"} color_P='#fff'>{offer?.flight?.departure_airport?.airport_code}
            </Headings>
            </div>
            <div className='flex justify-center px-2 sm:justify-start gap-2 items-center z-10'title={offer?.flight?.arrival_airport?.airport_name}>
            <FontAwesomeIcon icon={faPlaneArrival} className='text-white text-[11px]  sm:text-[15px]' />
            <Headings element={"p"} color_P='#fff'>{offer?.flight?.arrival_airport?.airport_code}
            </Headings>
            </div>
            
          </div>
         <div className='absolute bottom-0 left-0  flex bg-black/30 p-4 flex-col sm:flex-row justify-between items-center w-full'>
         
        <div >
         
            <div className='flex text-white flex-col gap-1 text-[12px] sm:text-[14px] pt-2'>
              <p>start :{offer?.start_date}</p>
              <p>end :{offer?.end_date}</p>
            </div>
            
          </div>
          <div className='flex flex-col'>
          <div className='flex justify-center items-center z-10 text-white  text-[12px] sm:text-[13px]'>
            <div className='text-right  text-[13px] md:text-[20px] line-through font-semibold'>{offer?.flight?.price}$</div>
            </div>
            <div className='flex justify-center items-center z-10 text-white  text-[12px] sm:text-[13px]'>
            <div className='text-right font-semibold text-[13px]  md:text-[20px]'>{offer?.flight?.price - offer?.discount * 100 / 100}$</div>
            </div>
            </div>
            <div className='show-btn absolute bottom-0 left-0 bg-white py-3  w-full flex justify-center flex-col items-center'>
            <div className='flex flex-col'>
            <div class=' flex justify-start flex-col  items-start sm:gap-2'>
              <label className='label text-nowrap text-[12px] mb-1 sm:mb-3'>
                <input type="radio" className="option-input radio" name="example" value="b" onChange={(e)=>{setAdults(0);setBooking_preference(e.target.value);ChangeValue(offer?.flight?.departure_airport?.airport_id,offer?.flight?.arrival_airport?.airport_id,offer?.start_date,offer?.end_date)}}/>
                Alone
              </label>
              <label className='label text-nowrap text-[12px] mb-1 sm:mb-3'>
                <input type="radio" className="option-input radio" name="example" value="a" onChange={(e)=>{setBooking_preference(e.target.value);ChangeValue(offer?.flight?.departure_airport?.airport_id,offer?.flight?.arrival_airport?.airport_id,offer?.start_date,offer?.end_date)}}/>
                With companions
              </label>
             
            </div>
           {
            booking_preference == "a"? <div className='flex justify-center sm:my-5 sm:mb-2 items-center  gap-2'>
            <span className='text-[12px] md:text-[16px] text-primary_color_1  pr-2'>Companion</span>
            <select defaultValue={"adults"} className='bg-white p-2 text-center text-secoundary_color w-[200px] lg:w-[250px] rounded-2xl text-[12px] md:text-[14px] font-bold border-primary_color border-solid border-b-2 select_option' disabled={booking_preference == "b"} value={adults} onChange={(e)=>setAdults(e.target.value)}>
                    <option value="adults" disabled>Select...</option>
                    
                  {
                    booking_preference == "a" ? null:<option value={1}>1</option>
                  }  
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>

                </select>
            </div>:null
           }
          </div>
            <Button onClick={()=>{Discover_Offer()}} color={"#836E42"} padding='4px'>Discover</Button>
            </div>

            </div>
            
        </div>
          
        </section>
    </>
  )
}

export default Offer_item;




// offer_id:6,
// image: '/assets/images/Offers-images/offer-6.webp',
// departure_date:"14 Aug 2024",
// return_date:"11 Sep 2024",
// type:"Economy",
// destination:"munich",
// price:"122$"