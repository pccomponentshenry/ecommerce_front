import { useState } from "react";
import s from "../styles/RoundChart.module.css";
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

  // console.log(userData);

  return (
    <div className={s.contentChart}>     
      <div style={{ width: 400 }}>
        <PieChart chartData={userData} />
      </div>
    </div>
  );
}
export default AppBarChart;
