import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import C from "../styles/Cards.module.css";

import { clear_cart, remove_one_from_cart } from "../redux/actions/index.js";

export default function ShoppingCart() {
  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();

  const clearCart = () => {
    dispatch(clear_cart());
  };

  const deleteFromCart = id => {
    dispatch(remove_one_from_cart(id));
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        position: "absolute",
        top: "50%",
      }}
    >
      {cart.map((el, index) => (
        <CartItem key={index} data={el} deleteFromCart={deleteFromCart} />
      ))}

      <button onClick={clearCart}>Clean Cart</button>
    </div>
  );
}
