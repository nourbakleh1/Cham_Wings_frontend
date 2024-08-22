import React from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'

const Loading3 = () => {
  return (
    <MagnifyingGlass
  visible={true}
  height="70"
  width="70"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#fff"
  color="#AE8A3B"
  />
  )
}

export default Loading3