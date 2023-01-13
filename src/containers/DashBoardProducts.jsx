import { useDispatch, useSelector } from "react-redux";
import SideDash from "../components/SideDash";
import s from "../styles/DashBoardProducts.module.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import adminPic from "../Images/admin_pic.png";

export default function DashBoardProducts() {
  const loggedUser = useSelector(state => state.user);
  const products = useSelector(state => state.products);
  const productOff = products.filter(p => p.status !== "active");

  return loggedUser.isAdmin === "true" ? (
    <div className={s.content}>
      <div className={s.header}>Products</div>
      <div className={s.sideContainer}>
        <SideDash />
      </div>
      <div className={s.dashBlock}>
        <div className={s.prodContainer}>
          <table id="table-id" className={s.tabla}>
            <thead>
              <tr>
                <th>ID</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>STOCK</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            {productOff.map(o => (
              <tbody key={o.id}>
                <tr>
                  <td>{o.id}</td>
                  <td>
                    <img
                      className={s.productImg}
                      src={o.img === null ? adminPic : o.img}
                    />
                  </td>
                  <td>{o.title.substr(0, 30) + "..."}</td>
                  <td>{o.stock}</td>
                  <td>{o.category.name}</td>
                  <td>${o.price}</td>
                  <td>
                    {o.status === "active" ? (
                      <div className={s.statusCont}>
                        <div className={s.statusProdOk}></div>
                        <div>{o.status}</div>
                      </div>
                    ) : (
                      <div className={s.statusCont}>
                        <div className={s.statusProdNo}></div>
                        <div>{o.status}</div>
                      </div>
                    )}
                  </td>
                  <td>
                    <Link to={`/update/${o.id}`}>
                      <button className={s.buttonEdit}>Edit Product</button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
