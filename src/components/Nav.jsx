import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./Login";
import { LogoutButton } from "./Logout";
import mode from "../Images/mode.png";
import cartImg from "../Images/cart.png";
import search from "../Images/Search.png";
import N from "../styles/NavBar.module.css";

export default function Nav() {
  const [nav, setNav] = useState(false);
  const cart = useSelector(state => state.cart);
  const { isAuthenticated } = useAuth0();

  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  //console.log('cartQuantity', cartQuantity);


  function switchMode() {
    if (window.scrollY >= 400) {
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
            <img
              src="https://res.cloudinary.com/dbtekd33p/image/upload/v1670804226/cqws5x8n/logo_play_expert_wv0yh2.png"
              alt=""
              className={N.logo}
            />
          </Link>
          <ul className={N.navList}>
            <Link to="/categories" style={{ textDecoration: "none" }}>
              <li>Categories</li>
            </Link>
            <Link to="/latest" style={{ textDecoration: "none" }}>
              <li>Latest</li>
            </Link>

            <Link to="/sell" style={{ textDecoration: "none" }}>
              {isAuthenticated ? <li>Sell</li> : <></>}
            </Link>
            <Link to="/favorites" style={{ textDecoration: "none" }}>
              <li>Favorites</li>
            </Link>
          </ul>
        </div>

        <div className={N.searchAndCart}>
          <h6 className={N.loginText}>
            {isAuthenticated ? (
              <>
                <LogoutButton />
              </>
            ) : (
              <LoginButton />
            )}
          </h6>
          <div>
            {cart.length > 0 && (
              <span className={N.cartNumber}>{cartQuantity}</span>
            )}
            <Link to="/cart">
              <img src={cartImg} className={N.cart} alt="cart icon" />
            </Link>
          </div>
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
