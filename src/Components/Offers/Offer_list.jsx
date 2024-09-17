import React, { useEffect } from 'react';
import Headings from '../Headings/Headings';
import Offer_item from './Offer_item';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getaOffersUser } from '../../Redux/ApiSlices/employee/ManageOffersSlice';

const Offer_list = ({offers}) => {
  const dispatch=useDispatch();
  const {user_offers}=useSelector(state=>state.offers);
 console.log(user_offers)
  useEffect(()=>{
    dispatch(getaOffersUser())
  },[])
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