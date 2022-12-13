import React from "react";
import N from "../styles/NavBar.module.css";
import search from "../Images/Search.png";
import cart from "../Images/cart.png";
import mode from "../Images/mode.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByName } from "../redux/actions";
import { LoginButton } from "./Login";
import { LogoutButton } from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";

export default function Nav() {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [showCart, setShowCart] = useState(false);
  const cartNumber = useSelector(state => state.cart);
  const { isAuthenticated } = useAuth0();

  function switchMode() {
    if (window.scrollY >= 400) {
      setNav(true);
    } else {
      setNav(false);
    }
  }
  useEffect(() => {
    dispatch(getProductsByName);
  }, [dispatch]);

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
            {cartNumber.length > 0 && (
              <span className={N.cartNumber}>{cartNumber.length}</span>
            )}
            <Link to="/cart">
              <img src={cart} className={N.cart} alt="cart icon" />
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
