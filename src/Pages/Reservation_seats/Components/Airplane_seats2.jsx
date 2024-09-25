import React from 'react'
import "../Reservation_seats.css"
import { seats_plan2} from '../../../dummy_data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faCircleCheck, faGlassWater, faPlane, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const Airplane_seats2 = ({selectedSeats2,setSelectedSeats2,setSelectedSeats2_name,selectedSeats2_name,occupied_return_seats,flight_details_ret}) => {
    const seats=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
    const {resultSearch} = useSelector((state) => state.flights);
    
    
    let class_Type=flight_details_ret?.type == "economy" ? 1: 2;
    let count_Seats=resultSearch?.booking_preference == "a" ? resultSearch?.adults + 1 :resultSearch?.booking_preference == "b" ? 1 : resultSearch?.adults;
    
    
   console.log("return",occupied_return_seats)
   console.log("fret",flight_details_ret)
  

  return (
    <section className='h-screen mt-[350px] md:mt-[-100px] mb-[650px] '>
    
    <div className='flex justify-center w-full gap-1 sm:gap-5 px-2 sm:px-0'>
    <div className='flex flex-col z-20   justify-evenly items-center h-[1122px] text-secoundary_color bg-[#e8e8e8e8] shadow-lg shadow-secoundary_color'>
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
    
    {seats_plan2?.map((el,idx)=>{
      
      if(occupied_return_seats){
        occupied_return_seats[0]?.data?.round_trip_reserved_seats?.map((item)=>{
          if(el.id == item?.seat_id){
            el.checked = 1
          }
          else{
            return
          }
        })
      }
      return (
        <div key={el.id} >
        

        <input type='checkbox' id={`seat ${idx}`} checked={el.selected == 1}  disabled={el.checked == 1 ? true :false || class_Type != el.class_id} className={`seat2 hidden `} onChange={()=>setSelectedSeats2(()=>
        {
          
            
            if(selectedSeats2?.includes(el.id)){
             
            let y=selectedSeats2_name?.filter((element)=>{
              return element !=el.seat_number
            })
           let x= selectedSeats2?.filter((item)=>{
            el.selected= 0
          return el.id != item;
         })
         
         setSelectedSeats2(x)
         setSelectedSeats2_name(y)
          }
         
             
        else{
          
           if(selectedSeats2.length < count_Seats)
          {
            el.selected = 1 ;
          setSelectedSeats2_name((prev)=>[...prev,el.seat_number])
          return [...selectedSeats2,el.id] }
          else{
            setSelectedSeats2(selectedSeats2);
            return toast.warning(`You cannot choose more than ${count_Seats} seats`);
            
          }

        }
      
          })} value={el.id} name='seat'/>
        <label  htmlFor={`seat ${idx}`}>
        <FontAwesomeIcon icon={faGlassWater}  className={ `${el.seat_number.endsWith("d")? `pl-5` : ``} icon2 text-[20px] p-[7px] py-2 
        ${el.class_id == 2 ? `bg-primary_color/20`:"bg-secoundary_color/20"} ${el.checked == 1 ?`text-red_color/50`:`text-green_color/50`}`}/>       
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

export default Airplane_seats2