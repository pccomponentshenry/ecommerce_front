import { useState, useEffect } from "react";
import s from "../styles/LineChart.module.css";
import LineChart from "../components/LineChart";
//import { UserData } from "../Data";
import "chart.js/auto";
import {getAllOrders} from "../redux/actions/index"
import { useDispatch, useSelector } from "react-redux";

function AppLineChart() {

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

  return (
    <div className={s.contentChart}>
      <div style={{ width: 400, textAlign: "center" }}>
      <h5 className={s.titleChart}>Best Sales</h5>

        <LineChart chartData={userData} />
      </div>
     
    </div>
  );
}
export default AppLineChart;
