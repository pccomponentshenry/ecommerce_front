import { useState, useEffect } from "react";
import s from "../styles/BarChart.module.css";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
//import { UserData } from "../Data";
import {getAllOrders} from "../redux/actions/index"
import { useDispatch, useSelector } from "react-redux";
import "chart.js/auto";

function AppBarChart() {
  const dispatch = useDispatch()  
  const allOrders = useSelector(state => state.allOrders);
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  console.log(allOrders)
  const [userData, setUserData] = useState({
    labels: allOrders.map((data) => data.title.substr(0, 0)),
    datasets: [
      {
        labels:"",
        data: allOrders.map((data) => data.total),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  });

   console.log(userData);

  return (
    <div className={s.contentChart}>
      <h5 className={s.titleChart}>Total Sales</h5>
      <div style={{ width: 500, textAlign:'center' }}>
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
