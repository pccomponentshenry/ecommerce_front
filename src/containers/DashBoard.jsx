import SideDash from "../components/SideDash"
import s from "../styles/DashBoard.module.css"
import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Graphs from "./AppBarChart"
import Line from "./AppLineChart"
import Round from "./AppRoundChart"
import { Person, LocalGroceryStore } from '@mui/icons-material';



export default function DashBoard() {
  const { isAuthenticated } = useAuth0();



  return (
    isAuthenticated && (
      <div className={s.content}>
        <div className={s.sideContainer}><SideDash /></div>
        <div className={s.dashContainer}>
          <div className={s.div1}><Graphs/></div>          
          <div className={s.div2}><Line/></div>
          <div className={s.div3}><h5>Manage Users</h5><Link className={s.link} to="/dashboard/users"><Person sx={{ fontSize: 240 }}/></Link></div>
          <div className={s.div4}><h5>Manage Sales</h5><Link className={s.link} to="/dashboard/sales"><LocalGroceryStore sx={{ fontSize: 240 }}/></Link></div>
        </div>
      </div>
    ) 
  );
}