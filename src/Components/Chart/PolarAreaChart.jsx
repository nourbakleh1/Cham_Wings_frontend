import React from "react";
import { PolarArea } from "react-chartjs-2";
import "./Style_Chart.css"
import Headings from "../Headings/Headings";

const PolarAreaChart=({ chartData })=> {
  return (
    <div className="chart-container">
    <div className="border-solid border-primary_color border-b-2">

     <Headings element={"h2"} color="#00529B" >Polar Area Chart</Headings>
     </div>
      <PolarArea
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Average reservations"
            }
          }
        }}
      />
    </div>
  );
}
export default PolarAreaChart;