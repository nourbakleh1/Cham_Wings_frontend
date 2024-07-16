import React from 'react'
import Headings from '../Headings/Headings';
import "./Offer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlane } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

const Offer_item = ({offer}) => {
  return (
    <>
        <section  className=' overflow-hidden basis-[450px] bg-white_color z-10 rounded-2xl hover:shadow-2xl transition-all delay-200 shadow-lg shadow-[#e8e8e8]'>
        <div className='parent-img relative'>
        <img className='imageOffer h-full mx-auto w-full  z-10' src={offer?.image}/>
         <div className='absolute bottom-0 left-0 p-5 flex flex-col sm:flex-row justify-between items-center w-full'>
        <div >
          <div className='flex justify-start gap-2 items-center z-10'>
            <FontAwesomeIcon icon={faPlane} className='text-white text-[15px]'/>
            <Headings element={"h3"} color='#fff'>{offer?.destination}
            </Headings>
            </div>
            <div className='flex text-white gap-1 text-[12px] sm:text-[14px]'>
              <p>{offer?.departure_date} - </p>
              <p>{offer?.return_date}</p>
            </div>
            
          </div>
          <div className='flex justify-center items-center z-10 text-white text-[12px] sm:text-[14px]'>
          <p>{offer?.type} from</p>
            <div className='text-right font-extrabold text-[15px] md:text-[25px] p-2'>{offer?.price}</div>
            </div>
            <div className='show-btn absolute bottom-0 left-0  w-full flex justify-center items-center'>
            <Button color={"#836E42"} padding='5px'>discover</Button>

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