import { useState, useEffect } from "react";
import s from "../styles/RoundChart.module.css";
import PieChart from "../components/PieChart";
//import { UserData } from "../Data";
import "chart.js/auto";
import {getAllOrders} from "../redux/actions/index"
import { useDispatch, useSelector } from "react-redux";

function AppBarChart() {
  const dispatch = useDispatch()
  
  const allOrders = useSelector(state => state.allOrders);
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

console.log(allOrders, 'allOrders')


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

   console.log(userData);

  return (
    <div className={s.contentChart}>     
      <div style={{ width: 400 }}>
        <PieChart chartData={userData} />
      </div>
    </div>
  );
}
export default AppBarChart;
