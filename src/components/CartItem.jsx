import React from "react";
import C from "../styles/CartItem.module.css";
import { useState } from "react";

export default function CartItem({ data, deleteFromCart }) {
  const { id, title, img, brand, price, quantity, stock } = data;

  const cart = JSON.parse(localStorage.getItem("cart"));
  const quant = JSON.parse(localStorage.getItem(id)) || 1;
  let [state, setState] = useState(quant);

  const setQuantityInput = productId => {
    for (let product of cart) {
      if (product.id === productId && state < stock) {
        product.quantity++;
        setState(state + 1);
        localStorage.setItem(id, JSON.stringify(quant + 1));
      }
    }
  };

  const decreaseQuantityInput = productId => {
    if (state !== 1) {
      for (let product of cart) {
        if (product.id === productId) {
          product.quantity--;
          setState(state - 1);
          localStorage.setItem(id, JSON.stringify(quant - 1));
        }
      }
    }
  };

  return (
    <>
      <div className={C.card}>
        <div className={C.btnCont}>
          <button onClick={() => deleteFromCart(id)}>🗑</button>
        </div>
        <div className={C.container}>
          <div className={C.imgCont}>
            <img src={img} alt="" />
          </div>
          <h4>{title.substr(0, 40) + "..."}</h4>
          <div className={C.counter}>
            <button
              className={C.Btn}
              id="-"
              onClick={e => decreaseQuantityInput(id)}
            >
              -
            </button>
            <span>{state}</span>
            <button
              className={C.plus}
              id="+"
              onClick={() => setQuantityInput(id)}
            >
              +
            </button>
          </div>
        </div>
        <h5 className={C.price}>${price}</h5>
      </div>
    </>
  );
}
