import React from "react";
import { Radar } from "react-chartjs-2";
import "./Style_Chart.css"
import Headings from "../Headings/Headings";

const RadarChart=({ chartData })=> {
  return (
    <div className="chart-container">
    <div className="border-solid border-primary_color border-b-2">

      <Headings element={"h2"} color="#00529B" >Radar Chart</Headings>
      </div>
      <Radar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Top countries"
            }
          }
        }}
      />
    </div>
  );
}
export default RadarChart;