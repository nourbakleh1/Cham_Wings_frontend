import React from 'react'
import { useQuery } from 'react-query'
import { publicRequest } from '../lib/publicRequest';

const getOffers=()=>{
       return publicRequest.get(`/api/getuseroffer?page=${1}`);
        
}
const useGetOffer = () => {
  return useQuery("offer",getOffers);
}

export default useGetOffer