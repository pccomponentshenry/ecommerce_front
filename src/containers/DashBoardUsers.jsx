import React from "react";
import SideDash from "../components/SideDash"
import s from "../styles/DashBoardUsers.module.css"

export default function DashBoardUsers() {
 
  return (

  <div className={s.content}>
  <div className={s.sideContainer}><SideDash/></div>
  <div className={s.userContainer}><h3>Listado de Usuarios para gestionar datos</h3></div>
   </div>
   
  );
}