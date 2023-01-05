import React from "react";
import s from "../styles/SideDash.module.css";
import { Link } from 'react-router-dom';

export default function SideDash() {

  return (
    <div className={s.Container}>
      <div><h5>Admin</h5></div>
      <br></br>
      <Link className={s.link} to="/dashboard"><div className={s.contentLink}><h6>Home</h6></div></Link>
      <Link className={s.link} to="/dashboard/stats"><div className={s.contentLink}><h6>Stats</h6></div></Link>
      <Link className={s.link} to="/dashboard/sales"><div className={s.contentLink}> <h6>Sales</h6></div></Link>
      <Link className={s.link} to="/dashboard/users"><div className={s.contentLink}> <h6>Users</h6></div></Link>
    </div>
  );
}
