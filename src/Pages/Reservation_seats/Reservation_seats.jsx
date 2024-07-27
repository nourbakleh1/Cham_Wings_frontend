import React from 'react'
import "./Reservation_seats.css"

const Reservation_seats = () => {
  return (
    <section className='h-screen mt-[400px] mb-[700px]'>
      <div className='flex justify-center items-center'>
      <div className='relative w-[200px] h-[1200px] bg-[#777] radios'>
        <div className='head_plan w-[200px] h-[200px]'></div>
        <div className='wings_right hidden xl:block'></div>
        <div className='wings_left hidden xl:block'></div>
        <div className='tail'></div>

      </div>
      </div>
    </section>
  )
}

export default Reservation_seats