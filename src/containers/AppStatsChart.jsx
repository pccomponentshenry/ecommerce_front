import { useState, useEffect } from "react";
import s from "../styles/StatsChart.module.css";
import BarChart from "../components/BarChart";
//import { UserData } from "../Data";
import "chart.js/auto";
import {getAllOrders} from "../redux/actions/index"
import { useDispatch, useSelector } from "react-redux";

function AppStatsChart() {

  const dispatch = useDispatch()
  
  const allOrders = useSelector(state => state.allOrders);
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const [userData, setUserData] = useState({
    labels: allOrders.map((data) => data.title.substr(0, 10) + "..."),
    datasets: [
      {
        label: "Ventas",
        data: allOrders.map((data) => data.total),
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
       <div style={{ width: 500, textAlign:'center' }}>
        <BarChart chartData={userData} />
      </div>
   </div>
  );
}
export default AppStatsChart;
