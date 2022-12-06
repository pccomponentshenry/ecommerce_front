import React from "react";
import N from "../styles/NavBar.module.css";
import search from "../Images/Search.png";
import cart from "../Images/cart.png";
import mode from "../Images/mode.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsByName, allProducts } from "../redux/actions";
export default function Nav() {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

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
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getProductsByName(name));
    //dispatch(clear());
    setName("");
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
            <input
              type="text"
              placeholder="Search"
              id="name"
              autoComplete="off"
              value={name}
              onChange={e => handleInputChange(e)}
            />
            <button onClick={e => handleSubmit(e)}>
              <img className={N.searchIcon} src={search} />{" "}
            </button>
            {/* <img src={search} alt="search icon" className={N.searchIcon} /> */}
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
    </>
  );
}
