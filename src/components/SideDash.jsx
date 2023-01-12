import React from "react";
import s from "../styles/SideDash.module.css";
import { Link } from "react-router-dom";

export default function SideDash() {
  return (
    <div className={s.Container}>
      <h5>Admin</h5>
      <ul className={s.sideNav}>
        <Link style={{ textDecoration: "none" }} to="/dashboard">
          <li>
            <h6>Home</h6>
          </li>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/dashboard/stats">
          <li>
            <h6>Stats</h6>
          </li>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/dashboard/products">
          <li>
            <h6>Products</h6>
          </li>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/dashboard/sales">
          <li>
            <h6>Sales</h6>
          </li>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/dashboard/users">
          <li>
            <h6>Users</h6>
          </li>
        </Link>
      </ul>

      {/* <Link className={s.link} to="/dashboard">
        <div className={s.contentLink}>
          <h6>Home</h6>
        </div>
      </Link>
      <Link className={s.link} to="/dashboard/stats">
        <div className={s.contentLink}>
          <h6>Stats</h6>
        </div>
      </Link>
      <Link className={s.link} to="/dashboard/products">
        <div className={s.contentLink}>
          <h6>Products</h6>
        </div>
      </Link>
      <Link className={s.link} to="/dashboard/sales">
        <div className={s.contentLink}>
          {" "}
          <h6>Sales</h6>
        </div>
      </Link>
      <Link className={s.link} to="/dashboard/users">
        <div className={s.contentLink}>
          {" "}
          <h6>Users</h6>
        </div>
      </Link> */}
    </div>
  );
}
