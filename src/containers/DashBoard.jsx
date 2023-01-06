import React from "react";
import SideDash from "../components/SideDash"
import { Link } from 'react-router-dom';
import s from "../styles/DashBoard.module.css"

export default function DashBoard() {

  return (

    <div className={s.content}>
      <div className={s.sideContainer}><SideDash /></div>
      <div className={s.dashContainer}><h3>Panel de administración</h3>
        <div><Link className={s.link} to="/dashboard/users"><h1>Gestionar Users</h1></Link></div>
        <div><Link className={s.link} to="/dashboard/sales"><h1>Gestionar Ventas</h1></Link></div>
      </div>
    </div>
  );
}