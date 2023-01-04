import React from "react";
import SideDash from "../components/SideDash"
import Graphs from "./AppBarChart"
import s from "../styles/DashBoardSales.module.css"

export default function DashBoardSales() {
 
  return (

  <div className={s.content}>
  <div className={s.sideContainer}><SideDash/></div>
    <div className={s.appBarChart}><Graphs/></div>
   </div>
   
  );
}