import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions";
import SideDash from "../components/SideDash";
import s from "../styles/DashBoardUsers.module.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import adminPic from "../Images/admin_pic.png";

export default function DashBoardUsers() {
  const users = useSelector(state => state.users);
  const loggedUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    loggedUser && (
      <div className={s.content}>
        <div className={s.sideContainer}>
          <SideDash />
        </div>
        <div className={s.header}>Users detail</div>
        <div className={s.dashBlock}>
          <div className={s.userContainer}>
            <table className={s.tabla}>
              <thead>
                <tr>
                  <th>USER ID</th>
                  <th>USERNAME</th>
                  <th>EMAIL</th>
                  <th>IMAGE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              {users.map(o => (
                <tbody key={o.id}>
                  <tr>
                    <td>{o.id}</td>
                    <td>{o.username}</td>
                    <td>{o.email}</td>
                    <td>
                      <img
                        className={s.profilePic}
                        src={o.image === null ? adminPic : o.image}
                      />
                    </td>
                    <td>
                      {o.status === "active" ? (
                        <div className={s.statusCont}>
                          <div className={s.statusUserOk}></div>
                          <div>{o.status}</div>
                        </div>
                      ) : (
                        <div className={s.statusCont}>
                          <div className={s.statusUserNo}></div>
                          <div>{o.status}</div>
                        </div>
                      )}
                    </td>
                    <td>
                      <Link to={`edit/${o.email}`}>
                        <button className={s.buttonEdit}>Edit User</button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    )
  );
}
