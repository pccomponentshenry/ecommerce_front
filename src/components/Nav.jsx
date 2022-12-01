import React from "react";
import N from "../styles/NavBar.module.css";
import search from "../Images/Search.png";
import cart from "../Images/cart.png";
import mode from "../Images/mode.png";
import { Link } from "react-router-dom";
export default function Nav() {
  function switchMode() {}
  return (
    <>
      <div className={N.container}>
        <div className={N.logoAndMenu}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1>Logo</h1>
          </Link>
          <ul className={N.navList}>
            <Link to="/categories" style={{ textDecoration: "none" }}>
              <li>Categories</li>
            </Link>
            <Link to="/latest" style={{ textDecoration: "none" }}>
              <li>Latest</li>
            </Link>
            <Link to="/sell" style={{ textDecoration: "none" }}>
              <li>Sell</li>
            </Link>
          </ul>
        </div>

        <div className={N.searchAndCart}>
          <div className={N.searchBar}>
            <input type="text" placeholder="Search" />
            <img src={search} alt="search icon" className={N.searchIcon} />
          </div>
          <h6 className={N.loginText}>Login/Register</h6>
          <img src={cart} className={N.cart} alt="cart icon" />
          <img
            src={mode}
            alt=""
            className={N.mode}
            onClick={() => switchMode()}
          />
        </div>
        <div className={N.line}>
          <hr />
        </div>
      </div>
    </>
  );
}
