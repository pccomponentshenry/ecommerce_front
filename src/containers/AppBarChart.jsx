import { useState, useEffect } from "react";
import F from "../styles/BarChart.module.css";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";

import "chart.js/auto";
import {getAllOrders} from "../redux/actions/index"
import { useDispatch, useSelector } from "react-redux";

function AppBarChart() {

  const dispatch = useDispatch()
  
  const allOrders = useSelector(state => state.allOrders);
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  //dispatch(getAllOrders())
  console.log(allOrders) 
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

  console.log(userData.datasets[0].data);  
  return (
    <div className={F.favContainer}>
      <div style={{ width: 800 }}>
        {userData.datasets[0].data.length > 0 ?<BarChart chartData={userData} /> : <h2>Loading</h2>}
        
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
