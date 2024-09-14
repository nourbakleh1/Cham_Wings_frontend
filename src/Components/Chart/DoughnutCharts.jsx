import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./Style_Chart.css"
import Headings from "../Headings/Headings";


const DoughnutCharts=({ chartData })=> {
  return (
    <div className="chart-container">
    <div className="border-solid border-primary_color border-b-2">

      <Headings element={"h2"} color="#00529B" >Doughnut Charts</Headings>
     </div>

      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Average total flights"
            }
          }
        }}
      />
    </div>
  );
}
export default DoughnutCharts;