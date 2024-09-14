import { Bar } from "react-chartjs-2";
import "./Style_Chart.css"
import Headings from "../Headings/Headings";

export const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
    <div className="border-solid border-primary_color border-b-2">

      <Headings element={"h2"} color="#00529B" >Bar Chart</Headings>
     </div>

      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Average ticket prices"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};