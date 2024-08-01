import React from 'react'
import { Hourglass } from 'react-loader-spinner'

const Loading1 = () => {
  return (
    <Hourglass
    visible={true}
    height="30"
    width="30"
    ariaLabel="hourglass-loading"
    wrapperStyle={{}}
    wrapperClass=""
    colors={['#AE8A3B', '#00529B']}
    />
  )
}

export default Loading1