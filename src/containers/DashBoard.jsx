import SideDash from "../components/SideDash"
import s from "../styles/DashBoard.module.css"
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export default function DashBoard() {
  const { isAuthenticated } = useAuth0();
  const loggedUser = useSelector(state => state.user);



  return (
    isAuthenticated && loggedUser.isAdmin === true ? (
      <div className={s.content}>
        <div className={s.sideContainer}><SideDash /></div>
        <div className={s.dashContainer}><h3>Panel de administración</h3>
          <div><Link className={s.link} to="/dashboard/users"><h1>Gestionar Users</h1></Link></div>
          <div><Link className={s.link} to="/dashboard/sales"><h1>Gestionar Ventas</h1></Link></div>
        </div>
      </div>
    ) : 
    (<div className={s.content}>
      <div className={s.side}></div>
      <div className={s.notAdminSide}><div className={s.notAdmin}>
        <h3>Sorry, you are not authorized to enter this section</h3>
        <h3>Plase <Link className={s.link} to="/">click here</Link> to go at Home</h3>
      </div></div>
    </div>)
  );
}