import React from 'react'
import Headings from '../Headings/Headings';
import "./Offer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const Offer_item = ({offer}) => {
  return (
    <>
        <section data-wow-offset="450" className='wow flipInX parent-offer p-5 basis-[450px] bg-white_color z-10 rounded-lg hover:shadow-2xl hover:shadow-[#00529B] transition-all delay-200 shadow-lg shadow-[#836E42]'>
        <div className='parent-img'>
        <img className='imageOffer h-[200px] mx-auto max-w-full  md:h-[300px] z-10' src={offer?.image} />

        </div>
            <div className='p-3 flex justify-start gap-2 items-center z-10'>
            <FontAwesomeIcon icon={faPlane} className='text-secoundary_color text-[22px]' />
            <Headings element={"h3"} color='#AE8A3B'>{offer?.destination}
            </Headings>
            </div>
            <div className='flex float-end items-center z-10'>
            <Headings element={"p"}>from</Headings>
            <div className='text-right font-extrabold text-[15px] md:text-[25px] p-2'>{offer?.price}</div>
            </div>
        </section>
    </>
  )
}

export default Offer_item;