import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

const Loading = () => {
  return (
    <MutatingDots
    visible={true}
    height="100"
    width="100"
    color="#AE8A3B"
    secondaryColor="#00529B"
    radius="16.5"
    ariaLabel="mutating-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />
  )
}

export default Loading