import React from 'react'
import { useQuery } from 'react-query'
import { privateRequest } from '../lib/privateRequest'

const getRecomm=(data)=>{
    return privateRequest.get(`/api/recommendations/${data.id}/${data.country}`)
}

const usegetRecommendation = (data) => {
  return useQuery("recomm",()=>getRecomm(data),{
    cacheTime:300000,
    staleTime:300000
  });
}

export default usegetRecommendation