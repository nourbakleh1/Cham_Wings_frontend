import React from 'react';
import Headings from '../Headings/Headings';
import Offer_item from './Offer_item';
import Button from '../Button/Button';

const Offer_list = ({offers}) => {
  return (
    
    <>
    <div className='mt-[100px]'>
        <Headings element={"h1"}>Offers</Headings>
        <div className='flex justify-center gap-[20px] md:gap-2 items-center flex-wrap p-5'>
        {offers?.map((offer)=>{
            return <Offer_item key={offer.offer_id} offer={offer}/>
        })}
        </div>
        
    </div>
    <div  className='flex justify-center mb-5'>
    <Button text="#000">more offers</Button>
    </div>
    </>
  )
}

export default Offer_list;