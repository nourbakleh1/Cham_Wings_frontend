import React from "react";
import { PolarArea } from "react-chartjs-2";

const PolarAreaChart=({ chartData })=> {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Polar Area Chart</h2>
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