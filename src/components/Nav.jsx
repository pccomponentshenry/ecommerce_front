import React from "react";
import N from "../styles/NavBar.module.css";
import search from "../Images/Search.png";
import cart from "../Images/cart.png";

export default function Nav() {
  return (
    <>
      <div className={N.container}>
        <div className={N.logoAndMenu}>
          <h1>Logo</h1>
          <ul className={N.navList}>
            <li>Categories</li>
            <li>Latest</li>
            <li>Sell</li>
          </ul>
        </div>

        <div className={N.searchAndCart}>
          <div className={N.searchBar}>
            <input type="text" placeholder="Search" />
            <img src={search} alt="search icon" className={N.searchIcon} />
          </div>
          <h6 className={N.loginText}>Login/Register</h6>
          <img src={cart} className={N.cart} alt="cart icon" />
        </div>
        <div className={N.line}>
          <hr />
        </div>
      </div>
    </>
  );
}
