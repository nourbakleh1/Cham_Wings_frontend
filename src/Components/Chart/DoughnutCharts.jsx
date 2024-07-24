import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutCharts=({ chartData })=> {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Doughnut Charts</h2>
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