import React, { useEffect, useState } from 'react'
import Sidbar_admin from '../../../Components/Sidbar_admin/Sidbar_admin';

const Manage_employees = () => {
    const [displaySidebar,setDisplaySidebar]=useState(false);
    useEffect(()=>{
      window.scrollTo(0,0);
    },[]);
  return (
    <div>
        <Sidbar_admin displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}/>
        <div className='h-[1500px] bg-gradient-to-t bg-gray_color'>
        </div>
    </div>
  )
}

export default Manage_employees