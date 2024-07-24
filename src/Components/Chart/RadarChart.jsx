import React from "react";
import { Radar } from "react-chartjs-2";

const RadarChart=({ chartData })=> {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Radar Chart</h2>
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