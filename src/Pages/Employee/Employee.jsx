import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getStatistics} from '../../Redux/ApiSlices/statisticsSlice';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from '../../Components/Chart/PieChart';
import Loading from '../../Components/Loading/Loading';
import { BarChart } from '../../Components/Chart/BarChart';
import LineChart from '../../Components/Chart/LineChart';
import PolarAreaChart from '../../Components/Chart/PolarAreaChart';
import DoughnutCharts from '../../Components/Chart/DoughnutCharts';
import RadarChart from '../../Components/Chart/RadarChart';


Chart.register(CategoryScale);

const Employee = () => {
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
    

    const chartData5= {
      labels: statistics?.results?.clusters[0]?.top_countries?.map((el)=>{
        return el.country
      }), 
      datasets: [
        {
          label: "Top countries",
          data: statistics?.results?.clusters[0]?.top_countries?.map((el)=>{
              return el.count
             })  ,
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
    const chartData6 = {
      labels: statistics?.results?.clusters[1]?.top_countries?.map((el)=>{
        return el.country
      }), 
      datasets: [
        {
          label: "Top countries",
          data: statistics?.results?.clusters[1]?.top_countries?.map((el)=>{
              return el.count
             })  ,
          backgroundColor: [
            "#000",
            "&quot;#ecf0f1",
            "#f3ba2f",
            "#00529B",
            "#50AF95",
            "#2a71d0",

          ],
          borderColor: "#777",
          borderWidth: 1
        }
      ]
    };


    const chartData7 = {
      labels: statistics?.results?.clusters[2]?.top_countries?.map((el)=>{
        return el.country
      }), 
      datasets: [
        {
          label: "Top countries",
          data: statistics?.results?.clusters[2]?.top_countries?.map((el)=>{
              return el.count
             })  ,
          backgroundColor: [
            "#50AF95",
            "#00529B",
            "&quot;#ecf0f1",
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
      dispatch(getStatistics());
      

    },[dispatch]);
    
    
      if(isLoading){
        return (
          <div className='flex justify-center items-center h-screen w-full bg-off_white sm:w-[calc(100%-256px)] ml-0 sm:ml-auto'>
          <div className='p-[100px] flex'>
          <Loading/>
          </div>
          </div>
        )
      };
      if(error){
        return (
          <div className='flex justify-center items-center text-red_color h-screen'>{error}</div>
        )
      };
    
  return (
    <div className='pt-[80px] w-full  sm:w-[calc(100%-256px)] ml-0 sm:ml-auto '>
        {/* <div className="p-4 sm:ml-64 pt-[80px]">
   <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <div className="grid grid-cols-3 gap-4 mb-4">
         <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
      </div>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
         <p className="text-2xl text-gray-400 dark:text-gray-500">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </svg>
         </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
      </div>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
         <p className="text-2xl text-gray-400 dark:text-gray-500">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </svg>
         </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
      </div>
   </div>
        </div> */}
        <div className='flex justify-evenly items-center flex-wrap gap-[40px] sm:gap-5'>
          <div className='w-[210px] sm:w-[300px] md:w-[350px] lg:w-[380px] shadow-lg rounded-lg p-3 shadow-primary_color_1'>
          <PieChart chartData={chartData} />

          </div>
          <div className='w-[210px] sm:w-[300px] md:w-[350px] lg:w-[380px] shadow-lg rounded-lg p-3 shadow-primary_color_1'>
          <LineChart chartData={chartData1}/>

          </div>
          <div className='w-[210px] sm:w-[300px] md:w-[350px] lg:w-[380px] shadow-lg rounded-lg p-3 shadow-primary_color_1'>
          <BarChart chartData={chartData2}/>

          </div>
          <div className='w-[210px] sm:w-[300px] md:w-[350px] lg:w-[380px] shadow-lg rounded-lg p-3 shadow-primary_color_1'>
          <PolarAreaChart chartData={chartData3}/>

          </div>
          <div className='w-[210px] sm:w-[300px] md:w-[350px] lg:w-[380px] shadow-lg rounded-lg p-3 shadow-primary_color_1'>
          <DoughnutCharts chartData={chartData4}/>

          </div>
          <div className='w-[210px] sm:w-[300px] md:w-[350px] lg:w-[380px] shadow-lg rounded-lg p-3 shadow-primary_color_1'>
          <RadarChart chartData={chartData5}/>

          </div>
          <div className='w-[210px] sm:w-[300px] md:w-[350px] lg:w-[380px] shadow-lg rounded-lg p-3 shadow-primary_color_1'>
          <RadarChart chartData={chartData6}/>

          </div>
          <div className='w-[210px] sm:w-[300px] md:w-[350px] lg:w-[380px] shadow-lg rounded-lg p-3 shadow-primary_color_1'>
          <RadarChart chartData={chartData7}/>

          </div>
        
       




        </div>
        

    </div>
  )
}

export default Employee