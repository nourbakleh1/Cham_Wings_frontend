import React, { useEffect, useState } from 'react'
import "./Reservation_seats.css"
import { seats_plan ,seats_plan2} from '../../dummy_data';
import { faArrowRightArrowLeft, faArrowsTurnToDots, faCircleCheck, faGlassWater, faPlane, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Headings from '../../Components/Headings/Headings';
import Button from '../../Components/Button/Button';
import Airplane_seats from './Components/Airplane_seats';
import Airplane_seats2 from './Components/Airplane_seats2';
import { toast } from 'react-toastify';

const Reservation_seats = () => {
    const seats=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
    const [selectedSeats1,setSelectedSeats1]=useState([]);
    const [selectedSeats1_name,setSelectedSeats1_name]=useState([]);

    const [selectedSeats2,setSelectedSeats2]=useState([]);
    const [selectedSeats2_name,setSelectedSeats2_name]=useState([]);



  const [changeSectors,setChangeSectors]=useState(true);
    
    

    const handelSelectedSeat=(e)=>{
      if(selectedSeats1.length == 0 || selectedSeats2.length == 0){
        return toast.error("(Selected seats 1 + Selected seats2) is required ")
      }
      console.log(selectedSeats1)
      console.log(selectedSeats2)

      
    }
    
  return (
    <>
      <div className='flex flex-col md:flex-row justify-between xl:justify-around items-center'>
      <div className='p-5 mt-[100px]'>
    <div className=' flex items-center gap-2 pb-6'>
      <Headings element={"h3"} color='#000'>{changeSectors?"DAM to SJH":"SJH to DAM"}</Headings>
      <FontAwesomeIcon icon={faArrowRightArrowLeft} className='text-primary_color_1'/>
      <FontAwesomeIcon icon={faPlane} className='text-secoundary_color px-3 text-[18px]'/>
    </div>
    <span className='text-secoundary_color font-bold pb-3'>{changeSectors?"Fligh 6Q741":"Fligh 7Q797"}</span>
    <Headings element={"p"}>select seats from the list below ...</Headings>
    <div className='number_seat'>
    <FontAwesomeIcon icon={faCircleCheck} className='px-1'/>
    <span>Mr. John smith</span>
    </div>

    <div className='p-5 bg-off_white w-[200px] sm:w-[250px]  lg:w-[350px] text-center shadow-lg shadow-primary_color'>
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
      <div onClick={()=>setChangeSectors(!changeSectors)} className='cursor-pointer bg-secoundary_color w-full text-center mt-5 text-white p-2'>go to next sector <FontAwesomeIcon icon={faArrowsTurnToDots}  className='text-[20px] ml-2 '/></div>

      </div>


      <div className='p-0 sm:p-5 shadow-lg shadow-primary_color z-[100] relative'>
        <div className='flex justify-between p-3 items-center  text-secoundary_color '>
          <span>Selected seats names</span>
          <FontAwesomeIcon icon={faArrowsTurnToDots}  className='text-[20px] ml-2 '/>
        </div>
        <div className='flex flex-col bg-primary_color/15'>
        <div className='flex justify-center   items-center flex-wrap md:flex-row p-3 gap-2 bg-secoundary_color/50'>
        
        <span className='text-[15px] text-center text-white p-1  sm:border-2 border-solid border-secoundary_color'>DAM to SJH</span>
        <div className='flex flex-wrap sm:flex-nowrap shadow-sm shadow-white_color'>
        {selectedSeats1_name?.map((el,idx)=>{
          return <span key={idx} className='text-white_color py-1 m-1 bg-primary_color '>{el}</span>
        })}
        </div>
        </div>
        <div className='flex justify-center   items-center flex-wrap md:flex-row p-3 gap-2 bg-secoundary_color/35'>
        
        <span className='text-[15px] text-center text-white p-1  sm:border-2 border-solid border-secoundary_color'>SJH to DAM</span>
        <div className='flex flex-wrap sm:flex-nowrap shadow-sm shadow-white_color'>
        { selectedSeats2_name?.map((el,idx)=>{
          return <span key={idx} className='text-white_color py-1 m-1 bg-primary_color '>{el}</span>
        })}
        </div>
        </div>
        </div>
        
        
        <div className='flex justify-between items-center p-3 gap-2 bg-off_white/50'>
        
        </div>
        <div className='w-full text-center'>
          <button onClick={handelSelectedSeat} className='bg-secoundary_color/50 w-full py-2 text-white_color'>Confirm selection</button>
        </div>
        <FontAwesomeIcon icon={faArrowsTurnToDots}  onClick={()=>setChangeSectors(!changeSectors)} className='text-[30px] rounded-2xl shadow-lg shadow-secoundary_color ml-2 text-white p-3 bg-primary_color absolute bottom-[-100px] right-[40%]'/>

      </div>

      
      </div>

      {
        changeSectors?<Airplane_seats selectedSeats1={selectedSeats1} setSelectedSeats1={setSelectedSeats1} selectedSeats1_name={selectedSeats1_name} setSelectedSeats1_name={setSelectedSeats1_name} />:
        <Airplane_seats2 selectedSeats2={selectedSeats2} setSelectedSeats2={setSelectedSeats2} selectedSeats2_name={selectedSeats2_name} setSelectedSeats2_name={setSelectedSeats2_name}/>
        
      }
      
    
    </>
   
  )
}

export default Reservation_seats