import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import "./Go_up.css"
const Go_up = () => {
  return (
    <div className=''>
        <FontAwesomeIcon icon={faAnglesUp} className='go_up  cursor-pointer text-[20px] lg:text-[40px] border-[#00529B]  text-primary_color z-[9999] fixed bottom-[20%] right-[5%]' />
    </div>
  )
}

export default Go_up;