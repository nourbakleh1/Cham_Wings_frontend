import React, { useEffect } from 'react';
import Headings from '../Headings/Headings';
import Offer_item from './Offer_item';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getOffersUser } from '../../Redux/ApiSlices/authSlice';
import Loading2 from '../Loading/Loading2';
import { useNavigate } from 'react-router-dom';

const Offer_list = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
    const { user_offers,error,isLoading}=useSelector((state)=>state.auth);
 
   // while refresh page
   useEffect(()=>{
    dispatch(getOffersUser(1)).unwrap().then((res)=>{
       
    }).catch((rej)=>{
        return toast.error(rej?.response?.data?.message);
    })
  },[]);
  return (
    
    <>
    <div className='mt-[100px]'>
        <Headings element={"h1"}>Offers</Headings>
        <div className='flex justify-center gap-12  items-center flex-wrap p-5'>
         {isLoading ? <Loading2/>: user_offers?.data?.data?.slice(0,6)?.map((offer)=>{
            return <Offer_item key={offer.offer_id} offer={offer}/>
        })}
        </div>
        
    </div>
    <div  className='flex justify-center mb-5'>
    <Button onClick={()=>navigate("/offers")} text="#000">more offers</Button>
    </div>
    </>
  )
}

export default Offer_list;