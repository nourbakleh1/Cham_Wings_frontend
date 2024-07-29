import React, { useEffect, useState } from 'react'
import "./Reservation_seats.css"
import { seats_plan } from '../../dummy_data';
import { faArrowRightArrowLeft, faCircleCheck, faGlassWater, faPlane, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Headings from '../../Components/Headings/Headings';
import Button from '../../Components/Button/Button';

const Reservation_seats = () => {
    const seats=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
    const [selectedSeats,setSelectedSeats]=useState([]);

    
    console.log(selectedSeats)
    const handelSelectedSeat=(e)=>{
    }
    
  return (
    <>
      <div className='flex flex-col md:flex-row justify-between xl:justify-around items-center'>
      <div className='p-5 mt-[100px]'>
    <div className=' flex items-center gap-2 pb-6'>
      <Headings element={"h3"} color='#000'>DAM to SJH</Headings>
      <FontAwesomeIcon icon={faArrowRightArrowLeft} className='text-primary_color_1'/>
      <FontAwesomeIcon icon={faPlane} className='text-secoundary_color px-3 text-[18px]'/>
    </div>
    <span className='text-secoundary_color font-bold pb-3'>Fligh 6Q741</span>
    <Headings element={"p"}>select seats from the list below ...</Headings>
    <div className='number_seat'>
    <FontAwesomeIcon icon={faCircleCheck} className='px-1'/>
    <span>Mr. John smith</span>
    </div>

    <div className='p-5 bg-off_white w-[200px] sm:w-[250px]  lg:w-[350px] text-center'>
      <Headings element={"h2"} color='#AE8A3B'>seatmap legend</Headings>
      <div className='flex items-center justify-center capitalize gap-3'>
      <FontAwesomeIcon icon={faGlassWater} className={ 'text-green_color/50  text-[30px] p-2 py-2 '}/> 
      <Headings element={"p"} color_P={'#777'}>available seat</Headings>
      </div>
      <div className='flex items-center justify-center capitalize gap-3'>
      <FontAwesomeIcon icon={faGlassWater} className={ 'text-red_color/50  text-[30px] p-2 py-2 '}/> 
      <Headings element={"p"} color_P={'#777'}>occupied seat</Headings>
      </div>
      <div className='flex items-center justify-center capitalize gap-3'>
      <FontAwesomeIcon icon={faGlassWater} className={ 'text-secoundary_color text-[30px] p-2 py-2 '}/> 
      <Headings element={"p"} color_P={'#777'}>selected seat</Headings>
      </div>
      </div>
      </div>


      <div className='p-0 sm:p-5'>
        <div className='flex justify-between p-3 items-center text-white_color bg-secoundary_color'>
          <span>Seats</span>
          <span>SYP 68344</span>
        </div>
        <div className='flex flex-col bg-primary_color/15 '>
        <div className='flex justify-between items-center p-3 gap-2'>
        <input type="radio"  name='s'/>
        <Headings element={"p"} color='#000'>DAM to SJH</Headings>
        <span>SYP 68344</span>

        </div>
        <div className='flex justify-between items-center p-3 gap-2'>
        <FontAwesomeIcon icon={faTrashCan}  className=' text-primary_color_1'/>
        <span>Mr. John smith</span>
        <span>7a</span>
        <span>SYP 68344</span>
        </div>
        </div>
        
        
        <div className='flex justify-between items-center p-3 gap-2 bg-off_white/50'>
        <input type="radio"  name='s'/>
        <Headings element={"p"} color='#000'>SJH to DAM</Headings>
        <span>SYP 0</span>
        </div>
        <div className='w-full text-center'>
          <button className='bg-secoundary_color w-full py-2 text-white_color'>Confirm selection</button>
        </div>

      </div>
      </div>
      <section className='h-screen mt-[240px] md:mt-[-100px] mb-[600px] '>
    
    <div className='flex justify-center w-full gap-1 sm:gap-5 px-2 sm:px-0'>
    <div className='flex flex-col z-20   justify-evenly items-center h-[1122px] text-secoundary_color bg-[#e8e8e8e8]'>
    {
      seats.map((el,idx)=>{
        return (<div key={idx} className='p-[3px] mb-[3px] border-[2px] border-primary_color border-solid'>
            {el}
        </div>)
      })
    }
    
      </div>
    <div className='relative w-[200px] h-[1200px] bg-[#e8e8e8e8] radios'>
    <form onSubmit={handelSelectedSeat}>
    <div className='flex justify-center items-center flex-wrap absolute top-1 left-0'> 
      {seats_plan?.map((el,idx)=>{
        return (
          <div key={el.id}>
          <input type='checkbox' id={`seat ${idx}`} disabled={el.status == "Occupied" ? true :false} className='seat hidden' onChange={()=>setSelectedSeats(()=>
          {
            if(selectedSeats?.includes(el.id)){
             let x= selectedSeats?.filter((item)=>{
            return el.id != item;
           })
           setSelectedSeats(x)
          }        
          else{
            return [...selectedSeats,el.id]
          }
            })} value={el.seat_number} name='seat'/>
          <label  htmlFor={`seat ${idx}`}>
          <FontAwesomeIcon icon={faGlassWater}    className={ `${el.seat_number.endsWith("d")? `pl-5` : ``} icon text-[20px] p-[7px] py-2 ${el.class_id == "business"? `bg-primary_color/20`:"bg-secoundary_color/20"} ${el.status =="Occupied"?`text-red_color/50`:`text-green_color/50`}`}/>       
          </label>

          </div>
         
          )
      })}
      
      </div>
      </form>
      <div className='head_plan w-[200px] h-[200px] relative'>
      <div className='flex justify-center items-center  bg-off_white text-primary_color absolute bottom-0 left-0 w-full'>
      {
          ['a','b','c','d','e','f'].map((el,idx)=>{
            return (<div key={idx} className='px-[11px] border-secoundary_color border-t-[4px] border-solid'>
              
                { el=== "d" ? <span className='pl-3'>{el}</span>:el
                }
            </div>)
          })
        }
      </div>
      </div>
     
      <div className='wings_right hidden xl:block'></div>
      <div className='wings_left hidden xl:block'></div>
      <div className='tail'></div>
      <div className='tail_right hidden sm:block'></div>
      <div className='tail_left hidden sm:block'></div>
    </div>
    </div>
  </section>
    </>
   
  )
}

export default Reservation_seats