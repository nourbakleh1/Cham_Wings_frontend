import React from 'react'
import { Blocks, InfinitySpin } from 'react-loader-spinner'

const Loading2 = () => {
  return (
    <Blocks
    height="60"
    width="60"
    color="#4fa94d"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
    visible={true}
    />
  )
}

export default Loading2