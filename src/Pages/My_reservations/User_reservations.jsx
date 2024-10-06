import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cancel_Reservation, get_Passengers_for_reservation, getReservation_user, Payment } from '../../Redux/ApiSlices/reservationSlice';
import { faEnvelopeOpenText, faEye, faMicrophone, faMoneyCheckDollar, faPenToSquare, faReply, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Headings from '../../Components/Headings/Headings';
import Loading1 from '../../Components/Loading/Loading1';
import Loading3 from '../../Components/Loading/Loading3';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import { toast } from 'react-toastify';
import Modal from '../../Components/Modal/Modal';
import Button from '../../Components/Button/Button';
import LargeModal from '../../Components/Modal/LargeModal';
import Loading4 from '../../Components/Loading/Loading4';

const User_reservations = () => {
    const dispatch=useDispatch();
    const {my_reservations,error,isLoading,isLoading_payment,reservation_pass}=useSelector((state)=>state.reservation);
  const { user } = useSelector((state) => state.auth);

    const [page,setPage]=useState(1);
    const [search,setSearch]=useState("");
    const [open5,setOpen5]=useState(false);
    const [open2,setOpen2]=useState(false);
    const [open4,setOpen4]=useState(false);

    //helper data
    const [data,setData]=useState(null);

    // console.log("my_reservations",my_reservations)
    useEffect(()=>{
        window.scrollTo(0,0);
  
          if(window.sessionStorage.getItem("page")){
            let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
            setPage(pageSaved)
          }
          return ()=>{
            if(window.sessionStorage.getItem("page")){
                window.sessionStorage.removeItem("page")
            }
          }
        },[]);

        
       useEffect(()=>{
        dispatch(getReservation_user(page)).unwrap().then((res)=>{
            window.sessionStorage.setItem("page",JSON.stringify(page))
        }).catch((rej)=>{
            return toast.error(rej?.response?.data?.message);
        })
      },[page]);

      const handelDeleteReservation=(id)=>{
        dispatch(cancel_Reservation(id)).unwrap().then((res)=>{
              dispatch( getReservation_user(page));
              setOpen2(false);
                return toast.success(res?.success);
        }).catch((rej)=>{
            return toast.error(rej?.response?.data?.message)
        })
      }
      const handelPayment=(id)=>{
        dispatch(Payment(id)).unwrap().then((res)=>{
            window.location.replace(`${res?.url}`);
         }).catch((rej)=>{
          return toast.error(rej?.response?.data?.errors);
         });
      }
      const getPASS=(id)=>{
        dispatch(get_Passengers_for_reservation(id));
      }
    console.log(data)
    console.log(reservation_pass)
  return (
    <div className='mt-[77px] lg:mt-[82px] '>
       {!isLoading_payment  ? <div className='flex justify-center items-center py-5'><Loading4/></div> : <div className="flex items-center justify-between  flex-column  p-4 flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4  bg-black/20">
       {/* tickets */}
       <LargeModal open={open4} setOpen={setOpen4}>
            <Headings element={"h1"}>View tickets</Headings>

            {
                data?.info?.is_traveling == 1 && <div className='bg-black_color/50 pb-4 border-b-4 border-solid border-black'>
            <div className='flex justify-center items-center pt-3'>
            <img
            src="/assets/images/logo_wings.png"
            className="h-8 sm:h-[38px]  lg:h-[42px] "
            alt="Logo"
          />
            </div>

            <div className='flex justify-between items-center px-5 mt-12'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Reservation date :</p><span className='text-off_white/60'>{new Date(data?.info?.created_at).toLocaleString()}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Reservation :</p><span className='text-off_white/60'>{data?.info?.status}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Reservation number :</p><span className='text-off_white/60'>{data?.info?.reservation_id}c</span>
            </div>
            </div>

            <div className='flex justify-between items-center px-5 mt-6'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Trip type :</p><span className='text-off_white/60'>{data?.info?.round_trip == 0 ?"one Way":"round trip"}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Departure terminal :</p><span className='text-off_white/60'>{data?.info?.flight?.departure_terminal}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Arrival terminal :</p><span className='text-off_white/60'>{data?.info?.flight.arrival_terminal}</span>
            </div>
            </div>

            <div className='flex justify-between items-center px-5 mt-6'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Flight number :</p><span className='text-off_white/60'>{data?.info?.flight?.flight_number}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Miles :</p><span className='text-off_white/60'>{data?.info?.flight?.miles}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'> Price :</p><span className='text-off_white/60'>{data?.info?.flight.price}</span>
            </div>
            </div>

            <p className=' ml-[2%] mt-5 border-b-4 border-b-secoundary_color border-dashed w-fit text-white font-extrabold'>Personal information</p>

            <div className='flex justify-between items-center px-5 mt-6'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Name :</p><span className='text-off_white/60'>{user?.data?.user?.passenger?.travel_requirement?.title}.{user?.data?.user?.passenger?.travel_requirement?.first_name} {user?.data?.user?.passenger?.travel_requirement?.last_name}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Age :</p><span className='text-off_white/60'>{user?.data?.user?.passenger?.travel_requirement?.age || "null"}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Gender :</p><span className='text-off_white/60'>{user?.data?.user?.passenger?.travel_requirement?.gender || "null"}</span>
            </div>
            </div>

            <div className='flex justify-between items-center px-5 mt-6'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Country :</p><span className='text-off_white/60'>{user?.data?.user?.passenger?.travel_requirement?.country_of_residence}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>City :</p><span className='text-off_white/60'>{user?.data?.user?.passenger?.travel_requirement?.city  || "null"}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Address :</p><span className='text-off_white/60'>{user?.data?.user?.passenger?.travel_requirement?.address || "null"}</span>
            </div>
            </div>

            <div className='flex justify-between items-center px-5 mt-6'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Date of birth :</p><span className='text-off_white/60'>{user?.data?.user?.passenger?.travel_requirement?.date_of_birth || "null"}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Nationality :</p><span className='text-off_white/60'>{user?.data?.user?.passenger?.travel_requirement?.nationality || "null" }</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'> Mobile during travel :</p><span className='text-off_white/60'>{user?.data?.user?.passenger?.travel_requirement?.mobile_during_travel || "null"}</span>
            </div>
            </div>
            <p className=' ml-[2%] mt-5 border-b-4 border-secoundary_color border-dashed w-fit text-white_color font-extrabold'>Personal contact</p>

            <div className='flex justify-between items-center gap-5 px-5 mt-6'>
            <div className='flex justify-center items-center  gap-1'>
                <p className='text-white_color font-semibold'>Email :</p><span className='text-off_white/60'>{user?.data?.user?.email || "null"}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Phone :</p><span className='text-off_white/60'>{user?.data?.user?.phone || "null" }</span>
            </div>
            
            </div>
            <p className=' ml-[2%] mt-5 border-b-4 border-secoundary_color border-dashed w-fit text-white_color font-extrabold'>information contact</p>
            <div className='flex justify-between items-center px-5 mt-6'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Country :</p><span className='text-off_white/60'>Syria</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>City :</p><span className='text-off_white/60'>Damascus</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'> Mobile :</p><span className='text-off_white/60'>+963 (11)2244086</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'> Email :</p><span className='text-off_white/60'>cs@chamwings.com</span>
            </div>
            </div>

            </div>
            }
            {
                reservation_pass?.data?.adults?.map((pass)=>{
                    return   data?.info?.is_traveling == 1 && <div key={pass?.companion_id} className='bg-black_color/50 pb-4 border-b-4 border-solid border-black'>
            <div className='flex justify-center items-center pt-3'>
            <img
            src="/assets/images/logo_wings.png"
            className="h-8 sm:h-[38px]  lg:h-[42px] "
            alt="Logo"
          />
            </div>

            <div className='flex justify-between items-center px-5 mt-12'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Reservation date :</p><span className='text-off_white/60'>{new Date(data?.info?.created_at).toLocaleString()}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Reservation :</p><span className='text-off_white/60'>{data?.info?.status}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Reservation number :</p><span className='text-off_white/60'>{data?.info?.reservation_id}c</span>
            </div>
            </div>

            <div className='flex justify-between items-center px-5 mt-6'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Trip type :</p><span className='text-off_white/60'>{data?.info?.round_trip == 0 ?"one Way":"round trip"}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Departure terminal :</p><span className='text-off_white/60'>{data?.info?.flight?.departure_terminal}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Arrival terminal :</p><span className='text-off_white/60'>{data?.info?.flight.arrival_terminal}</span>
            </div>
            </div>

            <div className='flex justify-between items-center px-5 mt-6'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Flight number :</p><span className='text-off_white/60'>{data?.info?.flight?.flight_number}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Miles :</p><span className='text-off_white/60'>{data?.info?.flight?.miles}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'> Price :</p><span className='text-off_white/60'>{data?.info?.flight.price}</span>
            </div>
            </div>

            <p className=' ml-[2%] mt-5 border-b-4 border-b-secoundary_color border-dashed w-fit text-white font-extrabold'>Personal information</p>

            <div className='flex justify-between items-center px-5 mt-6'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Name :</p><span className='text-off_white/60'>{pass?.travel_requirement?.title}.{pass?.travel_requirement?.first_name} {pass?.travel_requirement?.last_name}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Age :</p><span className='text-off_white/60'>{pass?.travel_requirement?.age || "null"}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Gender :</p><span className='text-off_white/60'>{pass?.travel_requirement?.gender || "null"}</span>
            </div>
            </div>

            <div className='flex justify-between items-center px-5 mt-6'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Country :</p><span className='text-off_white/60'>{pass?.travel_requirement?.country_of_residence}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>City :</p><span className='text-off_white/60'>{pass?.travel_requirement?.city  || "null"}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Address :</p><span className='text-off_white/60'>{pass?.travel_requirement?.address || "null"}</span>
            </div>
            </div>

            <div className='flex justify-between items-center px-5 mt-6'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Date of birth :</p><span className='text-off_white/60'>{pass?.travel_requirement?.date_of_birth || "null"}</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Nationality :</p><span className='text-off_white/60'>{pass?.travel_requirement?.nationality || "null" }</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'> Mobile during travel :</p><span className='text-off_white/60'>{pass?.travel_requirement?.mobile_during_travel || "null"}</span>
            </div>
            </div>
            <p className=' ml-[2%] mt-5 border-b-4 border-secoundary_color border-dashed w-fit text-white_color font-extrabold'>information contact</p>
            <div className='flex justify-between items-center px-5 mt-6'>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>Country :</p><span className='text-off_white/60'>Syria</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'>City :</p><span className='text-off_white/60'>Damascus</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'> Mobile :</p><span className='text-off_white/60'>+963 (11)2244086</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-white_color font-semibold'> Email :</p><span className='text-off_white/60'>cs@chamwings.com</span>
            </div>
            </div>

            </div>
                })
            }
       </LargeModal>
        {/* cancel reservation */}
        <Modal open={open2} setOpen={setOpen2}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to cancel <span className='font-extrabold text-secoundary_color/80'>{data?.date}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelDeleteReservation(data?.id)} color={"#cf2e2e"} padding='5px'>Delete</Button>
            <Button onClick={()=>setOpen2(!open2)} color={"#777"} padding='5px'>cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal>

       <div className='flex justify-center items-center m-auto h-[150px]'>
        <Headings element={"h1"} color='#ae8a3b'>my reservations</Headings> 
        </div>
        <label htmlFor="table-search" className="sr-only">Search</label>
        
       </div>}

       <div className="relative overflow-x-auto  sm:px-4 bg-black/20 shadow-2xl shadow-black_color/50  lg:rounded-b-lg">
    

     <table className="w-full text-sm text-left rtl:text-right text-gray-900 relative">
      <thead className="text-xs text-primary_color uppercase  bg-secoundary_color_1 ">
        <tr>
            <th scope="col" className="px-6 py-3">
                Reservation date
            </th>
            <th scope="col" className="px-6 py-3">
                Trip type
            </th>
            <th scope="col" className="px-6 py-3">
               reserved seats
            </th>
            <th scope="col" className="px-6 py-3">
                Flight details
            </th>
            <th scope="col" className="px-6 py-3">
                Companions
            </th>
            <th scope="col" className="px-6 py-3">
                Status
            </th>
            <th scope="col" className="px-6 py-3">
                Action
            </th>
        </tr>
    </thead>
    
   
    <tbody>
    
    {isLoading ? <tr> <td className=' p-5  rounded-xl z-[99999]  '></td><td className=' sm:block p-5  rounded-xl z-[99999]  '> </td><td className=' rounded-xl z-[99999] px-6 py-5 text-center align-middle'> 
       </td><td className=' rounded-xl z-[99999] px-6 py-5 text-center align-middle'> <div className="ps-3">
         <div className="text-base mr-5 mb-60"> 
         <Loading1/>
          </div>
          </div>
       </td></tr>:
        my_reservations?.data?.data?.map((reserv,idx)=>{
            return (
                <tr key={reserv?.reservation_id} className="bg-white_color/80 border-b  border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">
        <th scope="row" className="flex items-center px-6 py-12 text-primary_color_1 ">
            <div className="ps-4 text-center  align-middle">
                <div className="text-[13px] font-semibold">{new Date(reserv?.created_at).toLocaleString()}</div>
                
            </div>  
        </th>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[14px] text-primary_color_1 cursor-default text-nowrap"> 
          {reserv?.round_trip == 0 ? "One way":"Round trip"}
          </div>
        </div>
        </td>
        <td className="px-6 py-2 ">
        <div className="ps-3 ">
         <div className="text-[14px] text-primary_color_1 cursor-default w-[200px] flex-wrap flex justify-start items-center gap-3">
        
         {reserv?.seats?.map((seat,idx)=>{
        return (
            <div key={idx} className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg ">
          <span className='text-secoundary_color_1/80 font-semibold'>{seat?.row_number}{seat?.seat_number}</span>
          </div>
        )
       })}
          </div>  
        </div>
        </td>
      
        <td className="px-6 py-2">
        <div className="ps-3 text-center">
         <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         number <span className='text-secoundary_color_1/80 font-semibold'>{reserv?.flight?.flight_number}</span>
          </div>
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         price <span className='text-secoundary_color_1/80 font-semibold'>{reserv?.flight?.price}$</span>
          </div>
         
          <div className="text-[14px] text-gray_color font-bold border-b-2 border-primary_color border-dotted rounded-lg "> 
         miles <span className='text-secoundary_color_1/80 font-semibold'>{reserv?.flight?.miles}</span>
          </div>
         
          
        </div>
        </td>
        <td className="px-6 py-2">
        <div className="ps-3">
         <div className="text-[14px] text-primary_color_1 cursor-default">
          {reserv?.have_companions == null ? "No":"Yes"}
          </div>
        </div>
        </td>
        
       
    
        <td className="px-6 py-2">
            <div className="flex items-center">
            {reserv?.status == "Confirmed" ?<> <div className="h-2.5 w-2.5 rounded-full bg-green-400 me-2"></div> Confirmed</>:reserv?.status == "Pending"?<><div className="h-2.5 w-2.5 rounded-full bg-gray-400 me-2"></div> Pending</>:reserv?.status == "Canceled" ?<><div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Canceled</>:<><div className="h-2.5 w-2.5 rounded-full bg-black/80 me-2"></div> Ended</>}
            </div>
        </td>
        <td className=" text-center  align-middle">
        {reserv?.status == "Confirmed"  && <button  onClick={()=>{setOpen2(true);setData({id:reserv?.reservation_id,date:reserv?.reservation_date})}} className="font-bold text-[22px] m-2 text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
            <FontAwesomeIcon icon={faTrashCan} />
            </button>}
           {(reserv?.status == "Pending" && reserv?.seats.length != 0) &&<button onClick={()=>{ handelPayment(reserv?.reservation_id)}}   className="font-bold text-[25px] m-2 text-primary_color/80  disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
            <FontAwesomeIcon icon={faMoneyCheckDollar} />
           </button>} 
           {reserv?.status == "Confirmed"  && <button  onClick={()=>{setOpen4(true);getPASS(reserv?.reservation_id);setData({info:reserv})}} className="font-bold text-[24px] m-2 text-secoundary_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
            </button>}

             
            
           
        </td>
    </tr>
            )
        })
    }    
</tbody>   


</table>
<div className='pb-32'>
    {
        search.trim() == "" ? <CustomPagination isLoading={isLoading} page={page} setPage={setPage} totalElement={my_reservations?.data?.total} perPage={15}/>:null
    }
       
    </div>
</div>




       </div>
  )
}

export default User_reservations