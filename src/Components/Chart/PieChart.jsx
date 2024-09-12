import React from "react";
import { Pie } from "react-chartjs-2";
import "./Style_Chart.css"
import Headings from "../Headings/Headings";

const PieChart=({ chartData })=> {
  return (
    <div className="chart-container">
    <div className="border-solid border-primary_color border-b-2">

      <Headings element={"h2"} color="#00529B" >Pie Chart</Headings>
     </div>

      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "passenger segmentation chart"
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;