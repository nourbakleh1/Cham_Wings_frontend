import React from "react";
import { Line } from "react-chartjs-2";
import "./Style_Chart.css"
import Headings from "../Headings/Headings";

function LineChart({ chartData }) {
  return (
    <div className="chart-container">
    <div className="border-solid border-primary_color border-b-2">
      <Headings element={"h2"} color="#00529B" >Line Chart</Headings>
      </div>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Average ages"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;