import { useState, useEffect } from "react";
import SideDash from "../components/SideDash";
import s from "../styles/DashBoard.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Person,
  LocalGroceryStore,
  QueryStats,
  ProductionQuantityLimits,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/index";

export default function DashBoard() {
  const { isAuthenticated } = useAuth0();

  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return isAuthenticated && allUsers.length > 0 ? (
    <div className={s.content}>
      <div className={s.sideContainer}>
        <SideDash />
      </div>
      {/* <div className={s.dashContainer}>
          <div className={s.div3}><h5>Manage Users</h5><Link className={s.link} to="/dashboard/users"><Person sx={{ fontSize: 200 }} /></Link></div>
          <div className={s.div4}><h5>Manage Sales</h5><Link className={s.link} to="/dashboard/sales"><LocalGroceryStore sx={{ fontSize: 200 }} /></Link></div>
          <div className={s.div3}><h5>Manage Products</h5><Link className={s.link} to="/dashboard/products"><ProductionQuantityLimits sx={{ fontSize: 200 }} /></Link></div>
          <div className={s.div3}><h5>View Stats</h5><Link className={s.link} to="/dashboard/stats"><QueryStats sx={{ fontSize: 200 }} /></Link></div>

        </div> */}
      <div className={s.dashContainer}>
        <div className={s.iconBlock}>
          <Link className={s.link} to="/dashboard/users">
            <Person sx={{ fontSize: 75 }} />
            <h5>Manage Users</h5>
          </Link>
        </div>

        <div className={s.iconBlock}>
          <Link className={s.link} to="/dashboard/sales">
            <LocalGroceryStore sx={{ fontSize: 75 }} />
            <h5>Manage Sales</h5>
          </Link>
        </div>

        <div className={s.iconBlock}>
          <Link className={s.link} to="/dashboard/products">
            <ProductionQuantityLimits sx={{ fontSize: 75 }} />
            <h5>Manage Products</h5>
          </Link>
        </div>

        <div className={s.iconBlock}>
          <Link className={s.link} to="/dashboard/stats">
            <QueryStats sx={{ fontSize: 75 }} />
            <h5>View Stats</h5>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className={s.loadingCont}>
        <img
          src="https://res.cloudinary.com/dbtekd33p/image/upload/v1671166263/cqws5x8n/transparent_lfmu00.gif"
          alt=""
        />
      </div>
      <div className={s.loadingBackground}></div>
    </div>
  );
}
