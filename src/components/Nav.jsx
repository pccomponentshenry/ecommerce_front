import React from "react";
import N from "../styles/NavBar.module.css";
import search from "../Images/Search.png";
import cart from "../Images/cart.png";
import mode from "../Images/mode.png";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Nav() {
  const [nav, setNav] = useState(false);

  function switchMode() {
    if (window.scrollY >= 800) {
      setNav(true);
    } else {
      setNav(false);
    }
  }

  window.addEventListener("scroll", switchMode);
  return (
    <>
      <div className={`${N.container} ${nav ? N.active : N.container}`}>
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
            <Link to="/favorites" style={{ textDecoration: "none" }}>
              <li>Favorites</li>
            </Link>
          </ul>
        </div>

        <div className={N.searchAndCart}>
          <div className={N.searchBar}>
            <input type="text" placeholder="Search" />
            <img src={search} alt="search icon" className={N.searchIcon} />
          </div>
          <h6 className={N.loginText}>Login/Register</h6>
          <Link to="/cart">
            <img src={cart} className={N.cart} alt="cart icon" />
          </Link>
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
      <div className={N.bg}></div>
    </>
  );
}
