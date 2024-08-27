import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { getStatistics } from '../../Redux/ApiSlices/statisticsSlice';
import Loading from '../../Components/Loading/Loading';
import DoughnutCharts from '../../Components/Chart/DoughnutCharts';
import PolarAreaChart from '../../Components/Chart/PolarAreaChart';
import { BarChart } from '../../Components/Chart/BarChart';
import LineChart from '../../Components/Chart/LineChart';
import PieChart from '../../Components/Chart/PieChart';



Chart.register(CategoryScale);

const Admin = () => {
  const dispatch=useDispatch();
    const {statistics,isLoading,error}=useSelector((state)=>state.statistics);

  const chartData ={
    labels: statistics?.results?.clusters.map((el)=>{return el.size}),
    datasets: [
      {
        label: "passengers number",
        data: statistics?.results?.clusters?.map((el)=>{
          return el.size
        }),
        backgroundColor: [
          "#00529B",
          "&quot;#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "#777",

        borderWidth: 1
      }
    ]
  };

 
  const chartData1 = {
    labels: statistics?.results?.clusters.map((el)=>{return el.avg_age}), 
    datasets: [
      {
        label: "Average ages",
        data: statistics?.results?.clusters?.map((el)=>{
          return el.avg_age
        }),
        backgroundColor: [
          "#00529B",
          "&quot;#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "#00529B",
        borderWidth: 2
      }
    ]
  };

  const chartData2 ={
    labels: statistics?.results?.clusters.map((el)=>{return el.avg_ticket_price}), 
    datasets: [
      {
        label: "Average ticket prices",
        data: statistics?.results?.clusters?.map((el)=>{
          return el.avg_ticket_price
        }),
        backgroundColor: [
          "#00529B",
          "&quot;#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "#777",
        borderWidth: 1
      }
    ]
  };

  const chartData3 = {
    labels: statistics?.results?.clusters.map((el)=>{return el.avg_reservations}), 
    datasets: [
      {
        label: "Average reservations",
        data: statistics?.results?.clusters?.map((el)=>{
          return el.avg_reservations
        }),
        backgroundColor: [
          "#00529B",
          "&quot;#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "#777",
        borderWidth: 1
      }
    ]
  };


const chartData4 = {
labels: statistics?.results?.clusters.map((el)=>{return el.avg_total_flights}), 
datasets: [
  {
    label: "Average total flights",
    data: statistics?.results?.clusters?.map((el)=>{
      return el.avg_total_flights
    }),
    backgroundColor: [
      "#00529B",
      "&quot;#ecf0f1",
      "#50AF95",
      "#f3ba2f",
      "#2a71d0"
    ],
    borderColor: "#777",
    borderWidth: 1
  }
]
};
 

    useLayoutEffect(()=>{
      window.scrollTo(0,0);

      window.scrollTo(0,0);
      dispatch(getStatistics());
      

    },[dispatch]);
    
    
      if(isLoading){
        return (
          <div className='flex justify-center items-center h-screen w-full bg-off_white lg:w-[calc(100%-256px)] ml-0 sm:ml-auto'>
          <div className='p-[100px] flex'>
          <Loading/>
          </div>
          </div>
        )
      };
      if(error){
        return (
          <div className='flex justify-center items-center h-screen w-full bg-off_white lg:w-[calc(100%-256px)] ml-0 sm:ml-auto'>
          <div className='flex justify-center items-center text-red_color h-screen'>{error}</div>
          </div>
        )
      };
  return (
   <div className='pt-[80px] w-full  lg:w-[calc(100%-360px)] ml-0 sm:ml-auto p-5 mt-3'>
        
        <div className='flex justify-evenly flex-wrap  gap-[40px] sm:gap-5'>
          <div className='w-[210px] sm:w-[300px] md:w-[300px] lg:w-[380px] shadow-lg rounded-lg p-1 shadow-secoundary_color/80'>
          <PieChart chartData={chartData} />

          </div>
          <div className='w-[210px] sm:w-[270px] sm:flex sm:justify-center sm:items-center md:w-[300px] lg:w-[380px] shadow-lg rounded-lg p-1 shadow-secoundary_color/80'>
          <LineChart chartData={chartData1}/>

          </div>
          <div className='w-[210px] sm:w-[270px] sm:flex sm:justify-center sm:items-center md:w-[300px] lg:w-[380px] shadow-lg rounded-lg p-1 shadow-secoundary_color/80'>
          <BarChart chartData={chartData2}/>

          </div>
          <div className='w-[210px] sm:w-[270px] md:w-[300px] lg:w-[380px] shadow-lg rounded-lg p-1 shadow-secoundary_color/80'>
          <PolarAreaChart chartData={chartData3}/>

          </div>
          <div className='w-[210px] sm:w-[270px] md:w-[300px] lg:w-[380px] shadow-lg rounded-lg p-1 shadow-secoundary_color/80'>
          <DoughnutCharts chartData={chartData4}/>

          </div>
        </div>
        

    </div>
  )
}

export default Admin