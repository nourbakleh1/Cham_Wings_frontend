import React from 'react'
import { Blocks, InfinitySpin } from 'react-loader-spinner'

const Loading2 = () => {
  return (
    <Blocks
    height="50"
    width="50"
    color="#4fa94d"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
    visible={true}
    />
  )
}

export default Loading2