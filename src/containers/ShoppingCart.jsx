import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import S from "../styles/ShoppingCart.module.css";
import { useState } from "react";
import { clearCart } from "../redux/actions/index.js";
import Payment from "../stripe/Payment";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../components/Login";

export default function ShoppingCart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const { user, isAuthenticated } = useAuth0();
  var guest = "default"
  { user ? guest = user.nickname : guest = "default" }

  const handleClearCart = () => {
    isAuthenticated ?
      dispatch(clearCart(user.email)) :
      dispatch(clearCart());
  };

  useEffect(() => {
    setTotalPrice(
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  }, [cart]);

  return (
    <>
      <div className={S.container}>
        <div className={S.titleCont}>
          <h4 className={S.title}>Shopping Cart</h4>
        </div>

        {cart.length > 0 ? (
          <div>
            <div className={S.clearCont}>
              <button className={S.clearBtn} onClick={handleClearCart}>
                Clean Cart
              </button>
            </div>
            <div className={S.cartArea}>
              {cart.map((el, index) => (
                <CartItem key={index} item={el} />
              ))}
            </div>
            <h3 className={S.total}>
              Total: ${parseFloat(totalPrice).toFixed(2)}
            </h3>
            <div className={S.startShopping}>
              {guest === "default" ? <>Login to buy<LoginButton /> </> : <Payment />}
            </div>
          </div>
        ) : (
          <div className={S.emptyCart}>
            <h3>There are no products in your cart</h3>
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <span>Let's see some products</span>
            </Link>
          </div>
        )}
      </div>
      <div className={S.imgCont}>
        <h1>Just one step to become a pro</h1>
        <p>Customize your PC and level up!</p>
        <img
          src="https://res.cloudinary.com/dbtekd33p/image/upload/v1670795674/cqws5x8n/gamer_urddyh.jpg"
          alt=""
        />
      </div>
    </>
  );
}
