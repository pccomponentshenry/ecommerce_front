import { useState } from "react";
import F from "../styles/BarChart.module.css";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { UserData } from "../Data";
import "chart.js/auto";

function AppBarChart() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.description),
    datasets: [
      {
        label: "Ventas",
        data: UserData.map((data) => data.stock),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  });

  console.log(userData);
  return (
    <div className={F.favContainer}>
      <div style={{ width: 800 }}>
        <BarChart chartData={userData} />
      </div>
      {/* <div style={{ width: 400 }}>
        <LineChart chartData={userData} />
      </div>
      <div style={{ width: 400 }}>
        <PieChart chartData={userData} />
      </div> */}
    </div>
  );
}
export default AppBarChart;
