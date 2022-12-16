import React from "react";
import UserInfo from "../components/UserInfo";
import UserFav from "../components/UserFav";
import U from "../styles/ProfileInfo.module.css";

export default function ProfileDetail() {
  return (
    <div>
      <div className={U.infoContainer}>
        <UserInfo />
      </div>

      <div className={U.SwitchContainer}>
        <div className={U.BtnContainer}>
          <button className={U.active}>Favorites</button>
          <button className={U.inactive}>For sale</button>
          <button className={U.inactive}>Purchases</button>
          <div className={U.addProduct}>
            <h4>+</h4>
            <h5>New product</h5>
          </div>
        </div>

        <div className={U.cardsContainer}>
          <UserFav />
        </div>
      </div>
    </div>
  );
}
