import React from "react";
import N from "../styles/NavBar.module.css";
import search from "../Images/Search.png";
import cart from "../Images/cart.png";

export default function Nav() {
  return (
    <>
      <div className={N.navbarCont}>
        <h1>Logo</h1>
        <ul className={N.navList}>
          <li>Categories</li>
          <li>Latest</li>
          <li>Sell</li>
        </ul>
      </div>

      <div className={N.searchBarCont}>
        <input type="text" placeholder="Search" />
        <img src={search} alt="search icon" className={N.searchIcon} />
      </div>
      <h6 className={N.loginText}>Login/Register</h6>
      <img src={cart} className={N.cart} alt="cart icon" />
      <hr />
    </>
  );
}
