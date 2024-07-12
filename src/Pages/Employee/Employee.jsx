import React, { useState } from 'react'
import Sidbar from '../../Components/Sidbar/Sidbar'

const Employee = () => {
    const [displaySidebar,setDisplaySidebar]=useState(false);
  return (
    <div className=''>

        <Sidbar displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}/>
        <div className='h-[1500px] bg-gradient-to-t bg-gray_color'></div>
    </div>
  )
}

export default Employee