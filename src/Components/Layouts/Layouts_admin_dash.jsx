import React, { useState } from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Sidbar_admin from '../Sidbar_admin/Sidbar_admin'

const Layouts_admin_dash= () => {
    const [displaySidebar,setDisplaySidebar]=useState(false);
  return (
    <div>
        <Header/>
        <Sidbar_admin displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}/>
        <Outlet/>
    </div>
  )
}

export default Layouts_admin_dash