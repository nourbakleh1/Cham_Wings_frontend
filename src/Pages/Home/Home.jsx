import React, { useState } from 'react'
import Hero from '../../Components/Hero/Hero'
import Who_are_we from './Components/Who_are_we'
import Separator from '../../Components/Separator/Separator'
import Offer_list from '../../Components/Offers/Offer_list'
import {offers} from "../../dummy_data.js"
import Our_responsibilty from './Components/Our_responsibilty.jsx'




const Home = () => {
  return (
    <div>
      <Hero/>
      <Who_are_we/>
      <Separator type={"spikes"} Background_color={"#e8e8e8"}/>
      <Offer_list offers={offers}/>
      <Separator type={"curved"} Background_color='#fff' ></Separator>
      <Our_responsibilty/>
      




    </div>
  )
}

export default Home