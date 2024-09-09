import React from 'react'
import { Grid } from 'react-loader-spinner'

const Loading4 = () => {
  return (
   <Grid
        visible={true}
        height="70"
        width="70"
        color="#Ae8a3b"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
        />
  )
}

export default Loading4