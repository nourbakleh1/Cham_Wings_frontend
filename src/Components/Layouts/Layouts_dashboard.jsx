import React, { useState } from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Sidbar from '../Sidbar/Sidbar'

const Layouts_dashboard = () => {
    const [displaySidebar,setDisplaySidebar]=useState(false);
  return (
    <div>
        <Header/>
        <Sidbar displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}/>
        <Outlet/>
    </div>
  )
}

export default Layouts_dashboard