import React from "react";
import SideDash from "../components/SideDash"
import Graphs from "./AppStatsChart"
import Lines from "./AppLineChart"
import Round from "./AppRoundChart"
import s from "../styles/DashBoardStats.module.css"

export default function DashBoardStats() {
 
  return (

  <div className={s.content}>
  <div className={s.sideContainer}><SideDash/></div>
    <div className={s.statsContainer}><Graphs/><Lines/><Round/></div>
   </div>
   
  );
}

