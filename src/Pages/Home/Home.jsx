import React, { useEffect} from 'react'
import Hero from '../../Components/Hero/Hero'
import Who_are_we from './Components/Who_are_we'
import Separator from '../../Components/Separator/Separator'
import Offer_list from '../../Components/Offers/Offer_list'
import Our_responsibilty from './Components/Our_responsibilty.jsx'
import Search_flight from './Components/Search_flight.jsx'
import { useDispatch, useSelector } from 'react-redux'
import Slider from './Components/Slider.jsx'
import { clear_reservation } from '../../Redux/ApiSlices/reservationSlice.js'




const Home = () => {
  const {user}=useSelector(state=>state.auth);
  const dispatch = useDispatch();
  
 
  useEffect(()=>{
    window.scrollTo(0,0);
    dispatch(clear_reservation());
  },[]);
  
  return (
    <div className='relative'>
      <Hero img={"/assets/images/Hero_images/ChamWingsAirlines1.webp"}/>
      <Search_flight/>
      {user &&<Slider/>}
      <Who_are_we/>
      <Separator type={"spikes"} Background_color={"#e8e8e8"}/>
      <Offer_list/>
      <Separator type={"curved"} Background_color='#fff' ></Separator>
      <Our_responsibilty/>

      




    </div>
  )
}

export default Home