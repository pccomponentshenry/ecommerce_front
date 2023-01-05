import SideDash from "../components/SideDash"
import s from "../styles/DashBoard.module.css"
import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export default function DashBoard() {
  const { isAuthenticated } = useAuth0();



  return (
    isAuthenticated && (
      <div className={s.content}>
        <div className={s.sideContainer}><SideDash /></div>
        <div className={s.dashContainer}><h3>Administration panel</h3>
          <div><Link className={s.link} to="/dashboard/users"><h1>Manage Users</h1></Link></div>
          <div><Link className={s.link} to="/dashboard/sales"><h1>Manage Sales</h1></Link></div>
        </div>
      </div>
    ) 
  );
}