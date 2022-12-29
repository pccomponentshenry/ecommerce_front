import React from "react";
import { Bar } from "react-chartjs-2";



const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

function BarChart({ chartData, options }) {
  return <Bar data={chartData} options={options} />;
}

export default BarChart;
