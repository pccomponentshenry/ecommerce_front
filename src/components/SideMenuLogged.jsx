import React from "react";
import S from "../styles/SideBarLogged.module.css";
export default function SideMenuLogged() {
  const category = [
    "Keyboards",
    "Mouse",
    "Switches",
    "Mouse Pads",
    "Batteries",
    "Chargers",
  ];
  return (
    <div className={S.Container}>
      <div className={S.subContainer}>
        <div className={S.categoryContainer}>
          <hr />
          <h6>Categories</h6>
          {category.map((el, i) => (
            <>
              <div key={i}>
                <span>{el}</span>
                <br />
              </div>
            </>
          ))}

          <div className={S.filterContainer}>
            <hr />
            <h6>Filter by:</h6>
            <div className={S.select}>
              <select name="Filter" defaultValue={"DEFAULT"}>
                <option defaultValue={"DEFAULT"}>Category</option>
                {category.map((el, i) => (
                  <option key={i}>{el}</option>
                ))}
              </select>
            </div>
            <div className={S.select}>
              <select name="Filter" defaultValue={"DEFAULT"}>
                <option defaultValue={"DEFAULT"}>Brand</option>
                {category.map((el, i) => (
                  <option key={i}>{el}</option>
                ))}
              </select>
            </div>
            <div className={S.order}>
              <hr />
              <h6>Order by price</h6>
              <button>Higher to lower</button>
              <button>Lower to higher</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
