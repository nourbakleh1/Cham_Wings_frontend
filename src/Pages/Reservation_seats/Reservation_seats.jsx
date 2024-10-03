import React, { useEffect, useState } from 'react'
import "./Reservation_seats.css"
import { faArrowRightArrowLeft, faArrowRightLong, faArrowsTurnToDots, faCircleCheck, faGlassWater, faPlane, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Headings from '../../Components/Headings/Headings';
import Button from '../../Components/Button/Button';
import Airplane_seats from './Components/Airplane_seats';
import Airplane_seats2 from './Components/Airplane_seats2';
import { useDispatch, useSelector } from 'react-redux';
import { Add_Reservation, Add_Seats_TO_Reservation, clear_reservation, get_going_Occupied_seats,get_return_Occupied_seats, Payment} from '../../Redux/ApiSlices/reservationSlice';
import { clearResultSearch } from '../../Redux/ApiSlices/flightSlice';
import Modal from "../../Components/Modal/Modal";
import {  toast, ToastContainer } from 'react-toastify';
import {useNavigate } from 'react-router-dom';
import useAirplane_seats from '../../Hooks/useAirplane_seats';
import Loading4 from '../../Components/Loading/Loading4';
import { publicRequest } from '../../lib/publicRequest';



const Reservation_seats = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {occupied_going_seats,occupied_return_seats,reservation,isLoading_payment,visa}=useSelector(state=>state.reservation);
  const {selectedFlights,resultSearch} = useSelector((state) => state.flights);
  const {seats_plan,seats_plan2,setSeats_plan,setSeats_plan2} = useAirplane_seats();
  
  const [open2,setOpen2]=useState(false);
  
  let count_Seats=resultSearch?.booking_preference == "a" ? resultSearch?.adults + 1 :resultSearch?.booking_preference == "b" ? 1 : resultSearch?.adults;

  
  
  // console.log("reservation",reservation)
  //modal 
  const [open,setOpen]=useState(false);

  useEffect(()=>{
    window.scrollTo(0,0);
    setOpen2(true);
    setSelectedSeats1([])
    setSelectedSeats1_name([])
    setSelectedSeats2([])
    setSelectedSeats2_name([])
  },[]);
  // console.log("occupied_seats",occupied_going_seats)
  // console.log("return_seats",occupied_return_seats)
  
    const seats=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
    const [selectedSeats1,setSelectedSeats1]=useState([]);
    const [selectedSeats1_name,setSelectedSeats1_name]=useState([]);
    const flights = useSelector((state) => state.flights.resultSearch);
    const [flight_details_dep,setFlight_details_dep]=useState(null);
    const [flight_details_ret,setFlight_details_ret]=useState(null);
    const [companionDetails,setCompanionDetails]=useState(null);
    useEffect(()=>{
      if(selectedFlights){
        
        setFlight_details_dep({id:selectedFlights[0]?.flightId,type:selectedFlights[0]?.classType});
        setFlight_details_ret({id:selectedFlights[1]?.flightId,type:selectedFlights[1]?.classType});
      }
      if(window.localStorage.getItem("sel_companion")){
        const y = JSON.parse(window.localStorage.getItem("sel_companion"));
        setCompanionDetails(y);
      }
    },[]);

    const departure_flight_selected=flights?.departure_flights?.find((el)=>{
      return el?.flight_id == flight_details_dep?.id
    })
    // console.log(departure_flight_selected)
    const return_flight_selected=flights?.return_flights?.find((el)=>{
      return el?.flight_id == flight_details_ret?.id
    })
    // console.log(return_flight_selected)
    
    useEffect(()=>{
      if(departure_flight_selected){
        dispatch(get_going_Occupied_seats(departure_flight_selected?.schedule_time_id));
      }
      if(return_flight_selected){
        dispatch(get_return_Occupied_seats(return_flight_selected?.schedule_time_id));
      }
      // there is selected seats ?????????
    },[departure_flight_selected,return_flight_selected]);
    const [selectedSeats2,setSelectedSeats2]=useState([]);
    const [selectedSeats2_name,setSelectedSeats2_name]=useState([]);



    const [changeSectors,setChangeSectors]=useState(true);
    
    const [converted_com,setConverted_com]=useState(null);
    const [converted_inf,setConverted_inf]=useState(null);
    useEffect(()=>{
      if(window.localStorage.getItem("sel_companion")){
        // get  companions
        let companion = JSON.parse(window.localStorage.getItem("sel_companion"));
        const selected_Com = companion?.companiesDetails?.map(el=> el.companion_id);
        const res_comp=selected_Com.join();
        setConverted_com(res_comp)

        // get infants
        const selected_inf = companion?.companiesDetails?.map(el=> el.infant == 1 ? el.companion_id : null );
        const infants_id_arr=[];
        for(let i = 0 ; i <=selected_inf.length;i++){
          if(selected_inf[i] == null){
            continue;
          }
          else {
            infants_id_arr.push(selected_inf[i])
          }
          
        }
        const res_inf=infants_id_arr.join();
        setConverted_inf(res_inf);
      }
      
    },[]);
    
    // console.log("converted_com",converted_com);
    // console.log("converted_inf",converted_inf);
    

    const handelSelectedSeat=(e)=>{
      if(selectedSeats1.length == 0){
        return toast.error("selectedSeats1 is required ")
      }
      if(flights?.trip_type == "outbound"){
        if(selectedSeats2.length == 0){
          return toast.error("selectedSeats2 is required ")
        }
        if(selectedSeats1.length != selectedSeats2.length){
          return toast.error("The number of seats must be equal")
        }
      }
      if(flights){
        let round_trip = flights?.trip_type == "outbound" ? 1 : 0 ; 
        let is_traveling = flights?.booking_preference == "c" ? 0 : 1;
        let flight_id = departure_flight_selected?.flight_id;
        let schedule_time_id = departure_flight_selected?.schedule_time_id;
        let round_flight_id = return_flight_selected?.flight_id;
        let round_schedule_time_id = return_flight_selected?.schedule_time_id;
        let have_companions =converted_com;
        let infants=converted_inf;

        const data = {
          round_trip,flight_id,schedule_time_id,is_traveling
        }
        if(round_flight_id){
          data.round_flight_id = round_flight_id;
        }
        if(round_schedule_time_id){
          data.round_schedule_id = round_schedule_time_id
        }
        if(have_companions){
          data.have_companions = have_companions;
        }
        if(infants){
          data.infants = infants;
        }
        dispatch(Add_Reservation(data)).unwrap().then((res)=>{
          return toast.success(res?.success);
        }).catch((rej)=>{
          return toast.success(rej?.response?.data?.message);
        })
      }    
    }
    const handelAddSeatTOreservation=(id)=>{
      if(selectedSeats1.length == 0){
        return toast.error("selectedSeats1 is required ")
      }
      if(flights?.trip_type == "outbound"){
        if(selectedSeats2.length == 0){
          return toast.error("selectedSeats2 is required ")
        }
        if(selectedSeats1.length != selectedSeats2.length){
          return toast.error("The number of seats must be equal")
        }
      }
      const outbound_seats=selectedSeats1;
      const return_seats=selectedSeats2;
      let round_trip = flights?.trip_type == "outbound" ? 1 : 0 ; 
      const data={outbound_seats,return_seats,id,round_trip};

      dispatch(Add_Seats_TO_Reservation(data)).unwrap().then((res)=>{
        
        dispatch(Payment(reservation?.data?.reservation_id)).unwrap().then((res)=>{
          window.location.replace(`${res?.url}`);
         dispatch(clearResultSearch());
         dispatch(clear_reservation());
       }).catch((rej)=>{
        return toast.error(rej?.response?.data?.errors);
       });
        return toast.success(res?.success);
        
      }).catch((rej)=>{
        
        return toast.error(rej?.response?.data?.errors);
      });
    }
    
  return (
    <>
      <ToastContainer theme="colored" position="top-center"/>

      <div className='flex flex-col md:flex-row justify-between xl:justify-around items-center relative'>
      <Modal open={open2} setOpen={setOpen2}>
      <div className='flex flex-col mx-5'>

      
      <Headings element={"h2"} color='#000'>visa info</Headings>
      <div className='flex justify-center items-center gap-5 text-primary_color_1 bg-black_color/15  mb-1 rounded-xl p-2 font-extrabold py-5'>
        <p>{visa?.departure_airport?.airport_code || "null"}</p>
        <FontAwesomeIcon icon={faArrowRightLong} />
        <p>{visa?.arrival_airport?.airport_code || "null"}</p>

      </div>
      <div className='px-3 py-5 text-secoundary_color leading-relaxed font-bold p-5 mb-2 '>
      {visa?.visa_and_residence || "null"}
      </div>
      <div className='flex justify-center items-center mb-3'>
      
      <Button onClick={()=>{setOpen2(false)}} color={"#777"} padding='10px'>Agree</Button>
      </div>

      </div>
      </Modal>
       
      <div className='p-5 mt-[100px]'>
    <div className=' flex items-center gap-2 pb-6'>
      <Headings element={"h3"} color='#000'>{changeSectors?`${departure_flight_selected?.departure_airport_code} to ${departure_flight_selected?.arrival_airport_code}`
      :`${return_flight_selected?.departure_airport_code} to ${return_flight_selected?.arrival_airport_code}`}</Headings>
      <FontAwesomeIcon icon={faArrowRightArrowLeft} className='text-primary_color_1'/>
      <FontAwesomeIcon icon={faPlane} className='text-secoundary_color px-3 text-[18px]'/>
    </div>
    <span className='text-secoundary_color font-bold pb-3'>{changeSectors?`Flight ${departure_flight_selected?.flight_number}` :
    `Flight ${return_flight_selected?.flight_number}`}</span>
    <Headings element={"p"}>select seats from the list below ...</Headings>
    <div className='number_seat'>
    <FontAwesomeIcon icon={faCircleCheck} className='px-1'/>
    <span>{companionDetails?.passengerInfo?.title}. {companionDetails?.passengerInfo?.first_name} {companionDetails?.passengerInfo?.last_name}</span>
    </div>

    <div className='p-5 bg-off_white w-[200px] sm:w-[250px]  lg:w-[350px] text-center shadow-lg shadow-primary_color'>
      <Headings element={"h2"} color='#AE8A3B'>seatmap legend</Headings>
      <div className='flex items-center justify-center capitalize gap-2'>
      <FontAwesomeIcon icon={faGlassWater} className={ 'text-green_color/50  text-[30px] p-2 py-2 '}/> 
      <Headings element={"p"} color_P={'#777'}>available seat</Headings>
      </div>
      <div className='flex items-center justify-center capitalize gap-1'>
      <FontAwesomeIcon icon={faGlassWater} className={ 'text-red_color/50  text-[30px] p-2 py-2 '}/> 
      <Headings element={"p"} color_P={'#777'}>occupied seat</Headings>
      </div>
      <div className='flex items-center justify-center capitalize gap-2'>
      <FontAwesomeIcon icon={faGlassWater} className={ 'text-secoundary_color text-[30px] p-2 py-2 '}/> 
      <Headings element={"p"} color_P={'#777'}>selected seat</Headings>
      </div>
      
      </div>
      {return_flight_selected && <div onClick={()=>setChangeSectors(!changeSectors)} className='cursor-pointer bg-secoundary_color w-full text-center mt-5 text-white p-2'>go to next sector <FontAwesomeIcon icon={faArrowsTurnToDots}  className='text-[20px] ml-2 '/></div>
      }
      </div>


      {!isLoading_payment ? <Loading4/>:
        <div className='p-0 sm:p-5 shadow-lg shadow-primary_color z-[100] relative'>
        <div className='flex justify-between p-3 items-center  text-secoundary_color'>
          <span>Selected seats names</span>
          <FontAwesomeIcon icon={faArrowsTurnToDots}  className='text-[20px] ml-2 '/>
        </div>
        <div className='flex flex-col bg-primary_color/15'>
        <div className='flex justify-center   items-center flex-wrap md:flex-row p-3 gap-2 bg-secoundary_color/50'>
        <span className='text-[15px] text-center text-white p-1  sm:border-2 border-solid border-secoundary_color'>{count_Seats}</span>
        <span className='text-[15px] text-center text-white p-1  sm:border-2 border-solid border-secoundary_color'>{`${departure_flight_selected?.departure_airport_code} to ${departure_flight_selected?.arrival_airport_code}`}</span>
        <div className='flex flex-wrap sm:flex-nowrap shadow-sm shadow-white_color'>
        {selectedSeats1_name?.map((el,idx)=>{
          return <span key={idx} className='text-white_color py-1 px-1 m-1 bg-primary_color/75 '>{el}</span>
        })}
        </div>
        </div>
        {return_flight_selected && <div className='flex justify-center   items-center flex-wrap md:flex-row p-3 gap-2 bg-secoundary_color/35'>
          <span className='text-[15px] text-center text-white p-1  sm:border-2 border-solid border-secoundary_color'>{count_Seats}</span>
        <span className='text-[15px] text-center text-white p-1  sm:border-2 border-solid border-secoundary_color'>{`${return_flight_selected?.departure_airport_code} to ${return_flight_selected?.arrival_airport_code}`}</span>
        <div className='flex flex-wrap sm:flex-nowrap shadow-sm shadow-white_color'>
        { selectedSeats2_name?.map((el,idx)=>{
          return <span key={idx} className='text-white_color py-1 px-1 m-1 bg-primary_color/75 '>{el}</span>
        })}
        </div>
        </div>
        }
        </div>
        
        
        <div className='flex justify-between items-center p-3 gap-2 bg-off_white/50'>
        
        </div>
        <div className='w-full text-center'>
          {reservation ?<button onClick={()=>handelAddSeatTOreservation(reservation?.data?.reservation_id)} className='bg-secoundary_color/50 w-full py-2 text-white_color'>Confirm selection</button>
          :<button onClick={handelSelectedSeat} className='bg-secoundary_color/50 w-full py-2 text-white_color'>save</button>}
          
        </div>
        {return_flight_selected &&<FontAwesomeIcon icon={faArrowsTurnToDots}  onClick={()=>setChangeSectors(!changeSectors)} className='text-[30px] block sm:hidden rounded-2xl shadow-lg shadow-secoundary_color ml-2 text-white p-3 bg-primary_color absolute bottom-[-100px] right-[40%]'/>
        }
      </div>}
      

      
      </div>

      {
        changeSectors?<Airplane_seats seats_plan={seats_plan} setSeats_plan={setSeats_plan} occupied_going_seats={occupied_going_seats} flight_details_dep={flight_details_dep} selectedSeats1={selectedSeats1} setSelectedSeats1={setSelectedSeats1} selectedSeats1_name={selectedSeats1_name} setSelectedSeats1_name={setSelectedSeats1_name} />:
        <Airplane_seats2 seats_plan2={seats_plan2} setSeats_plan2={setSeats_plan2} occupied_return_seats={occupied_return_seats}  flight_details_ret={flight_details_ret} selectedSeats2={selectedSeats2} setSelectedSeats2={setSelectedSeats2} selectedSeats2_name={selectedSeats2_name} setSelectedSeats2_name={setSelectedSeats2_name}/>
        
      }
      
    
    </>
   
  )
}

export default Reservation_seats