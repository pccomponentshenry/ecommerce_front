import React from "react";
import N from "../styles/NavBar.module.css";
import search from "../Images/Search.png";
import cart from "../Images/cart.png";
import mode from "../Images/mode.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsByName } from "../redux/actions";
import { LoginButton } from "./Login";
import { LogoutButton } from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";

export default function Nav() {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [showCart, setShowCart] = useState(false);

  const { isAuthenticated } = useAuth0();

  function switchMode() {
    if (window.scrollY >= 800) {
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
          <Link to="/cart">
            <img
              src={cart}
              className={N.cart}
              alt="cart icon"
              // onClick={() => {
              //   setShowCart(true);

              // }}
            />
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
    </>
  );
}
