import React, { useEffect } from 'react'
import "../Reservation_seats.css"
import { seats_plan ,seats_plan2} from '../../../dummy_data';
import { faArrowRightArrowLeft, faCircleCheck, faGlassWater, faPlane, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Airplane_seats = ({selectedSeats1,setSelectedSeats1,setSelectedSeats1_name,selectedSeats1_name}) => {
    const seats=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];



  return (
    <section className='h-screen mt-[350px] md:mt-[-100px] mb-[650px] '>
    
    <div className='flex justify-center w-full gap-1 sm:gap-5 px-2 sm:px-0'>
    <div className='flex flex-col z-20   justify-evenly items-center h-[1122px] text-secoundary_color bg-[#e8e8e8e8] shadow-lg shadow-primary_color'>
    {
      seats.map((el,idx)=>{
        return (<div key={idx} className='p-[3px] mb-[3px] border-[2px] border-primary_color border-solid'>
            {el}
        </div>)
      })
    }
    
      </div>
    <div className='relative w-[200px] h-[1200px] bg-[#e8e8e8e8] radios'>
    <form >
    <div className='flex justify-center items-center flex-wrap absolute top-1 left-0'> 
    
      {seats_plan?.map((el,idx)=>{
        return (
          <div key={el.id}>
          <input type='checkbox' id={`seat ${idx}`} checked={el.checked =="yes"} disabled={el.status == "Occupied" ? true :false} className='seat hidden' onChange={()=>setSelectedSeats1(()=>
          {
            if(selectedSeats1?.includes(el.id)){
              let y=selectedSeats1_name?.filter((element)=>{
                return element !=el.seat_number
              })
             let x= selectedSeats1?.filter((item)=>{
              el.checked="no"
            return el.id != item;
           })
           setSelectedSeats1(x)
           setSelectedSeats1_name(y)
          }        
          else{
            el.checked="yes"
            setSelectedSeats1_name((prev)=>[...prev,el.seat_number])
            return [...selectedSeats1,el.id] 
          }
            })} value={el.id} name='seat'/>
          <label  htmlFor={`seat ${idx}`}>
          <FontAwesomeIcon icon={faGlassWater}    className={ `${el.seat_number.endsWith("d")? `pl-5` : ``} icon text-[20px] p-[7px] py-2 
          ${el.class_id == "business"? `bg-primary_color/20`:"bg-secoundary_color/20"} ${el.status =="Occupied"?`text-red_color/50`:`text-green_color/50`}`}/>       
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
      <div className='tail hidden sm:block'></div>
      <div className='tail_right hidden sm:block'></div>
      <div className='tail_left hidden sm:block'></div>
    </div>
    </div>
  </section>
  )
}

export default Airplane_seats