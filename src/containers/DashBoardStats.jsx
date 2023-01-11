import React from "react";
import SideDash from "../components/SideDash"
import s from "../styles/DashBoardStats.module.css"

export default function DashBoardStats() {

  return (

    <div className={s.content}>
      <div className={s.sideContainer}><SideDash /></div>
      <div className={s.statsContainer}>
        <div>
          <h2>Best Sales</h2>
          <table className={s.tabla}>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>PRODUCT</th>
                <th>SALES</th>
              </tr>
            </thead>
            {/* {orders.map((o) =>
          <tbody>
            <tr>
              <td>{o.id}</td>
              <td>{user[user.findIndex(e => e.id === o.userId)].email}</td>
              <td>{o.address.streetName} {o.address.streetNumber} - {o.address.location.name}</td>
            </tr>
          </tbody>
        )} */}

          </table>

        </div>

        <div>
          <h2>Lastest Sales</h2>
          <table className={s.tabla}>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>PRODUCT</th>
                <th>DATE</th>
              </tr>
            </thead>
            {/* {orders.map((o) =>
          <tbody>
            <tr>
              <td>{o.id}</td>
              <td>{user[user.findIndex(e => e.id === o.userId)].email}</td>
              <td>{o.address.streetName} {o.address.streetNumber} - {o.address.location.name}</td>
            </tr>
          </tbody>
        )} */}

          </table>

        </div>

      </div>
    </div>
  );
}

