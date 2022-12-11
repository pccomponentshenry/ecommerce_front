import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import S from "../styles/ShoppingCart.module.css";
import { useState } from "react";
import { clear_cart, remove_one_from_cart } from "../redux/actions/index.js";

export default function ShoppingCart(props) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const clearCart = () => {
    dispatch(clear_cart());
  };

  const deleteFromCart = id => {
    dispatch(remove_one_from_cart(id));
  };

  // const quantity = Number(window.localStorage.getItem("quantity"));
  // const item = JSON.parse(window.localStorage.getItem("cart"));

  // const totalPrice = item[0].price * quantity;
  // const price = parseFloat(totalPrice).toFixed(2);

  return (
    <>
      <div className={S.container}>
        <div className={S.titleCont}>
          <h4 className={S.title}>Shopping Cart</h4>
        </div>
        <span
          className={S.exit}
          onClick={() => {
            props.setShowCart(false);
          }}
        >
          X
        </span>
        <div className={S.clearCont}>
          <button className={S.clearBtn} onClick={clearCart}>
            Clean Cart
          </button>
        </div>
        <div className={S.cartArea}>
          {cart.map((el, index) => (
            <CartItem key={index} data={el} deleteFromCart={deleteFromCart} />
          ))}
        </div>
        <h3 className={S.total}>Total: $</h3>
        <div className={S.startShopping}>
          <span>Start shopping</span>
        </div>
      </div>
    </>
  );
}
