import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./Login";
import { LogoutButton } from "./Logout";
import cartImg from "../Images/cart.png";
import menu from "../Images/menu.png";
import mode from "../Images/mode.png";
import { setDarkMode } from "../redux/actions";

import N from "../styles/NavBar.module.css";

export default function Nav() {
  const [nav, setNav] = useState(false);
  const [activeNav, setActiveNav] = useState(false);
  const cart = useSelector(state => state.cart);
  const isDarkMode = useSelector(state => state.isDarkMode);
  const { isAuthenticated } = useAuth0();
  const loggedUser = useSelector(state => state.user);
  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const dispatch = useDispatch();

  function toggleDarkMode() {
    if (isDarkMode) {
      //Change to dark
      document.body.className = "lightmode";
    } else {
      //Change to light
      document.body.className = "darkmode";
    }
    dispatch(setDarkMode(!isDarkMode));
  }
  // buttonDark.addEventListener("click", toggleDarkMode);

  return (
    <>
      {loggedUser.status === "banned" ? (
        <></>
      ) : (
        <div
          className={`${activeNav === true ? N.container : N.containerSmall} ${
            nav ? N.active : N.container
          }`}
        >
          <div
            className={N.menuCont}
            onClick={() => {
              setActiveNav(!activeNav);
            }}
          >
            <img src={menu} alt="menu icon" />
          </div>
          <div className={N.logoAndMenu}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className={N.logoCont}>
                <img
                  src="https://res.cloudinary.com/dbtekd33p/image/upload/v1670804226/cqws5x8n/logo_play_expert_wv0yh2.png"
                  alt=""
                  className={N.logo}
                />
              </div>
            </Link>
            <ul className={N.notResponsiveNav}>
              <Link to="/sell" style={{ textDecoration: "none" }}>
                {isAuthenticated && loggedUser.status !== "banned" ? (
                  <li>Sell</li>
                ) : (
                  <></>
                )}
              </Link>
              <Link to="/favorites" style={{ textDecoration: "none" }}>
                <li>Favorites</li>
              </Link>
            </ul>
            {activeNav === true && (
              <ul className={isAuthenticated ? N.navList : N.authNavList}>
                <Link to="/sell" style={{ textDecoration: "none" }}>
                  {isAuthenticated ? (
                    <li
                      className={
                        isAuthenticated ? N.authenticated : N.notAuthenticated
                      }
                    >
                      Sell
                    </li>
                  ) : (
                    <></>
                  )}
                </Link>
                <Link to="/favorites" style={{ textDecoration: "none" }}>
                  <li
                    className={
                      isAuthenticated ? N.authenticated : N.notAuthenticated
                    }
                  >
                    Favorites
                  </li>
                </Link>
              </ul>
            )}
          </div>
          {/* 
        <div className={N.searchAndCart}> */}
          <div className={isAuthenticated ? N.loginText : N.authLoginText}>
            {isAuthenticated ? (
              <>
                <LogoutButton active={activeNav} />
              </>
            ) : (
              <LoginButton active={activeNav} />
            )}
          </div>
          <div className={N.tinyBtns}>
            {cart.length > 0 && (
              <span className={N.cartNumber}>{cartQuantity}</span>
            )}
            <Link to="/cart">
              <img src={cartImg} className={N.cart} alt="cart icon" />
            </Link>

            <img
              src={mode}
              onClick={toggleDarkMode}
              alt=""
              className={N.mode}
            />
          </div>
        </div>
      )}

      {/* </div> */}
    </>
  );
}
