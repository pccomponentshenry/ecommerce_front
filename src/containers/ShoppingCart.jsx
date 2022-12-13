import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import S from "../styles/ShoppingCart.module.css";
import { useState } from "react";
import { clear_cart, remove_one_from_cart } from "../redux/actions/index.js";
import Payment from "../stripe/Payment";

export default function ShoppingCart(props) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const clearCart = () => {
    dispatch(clear_cart());
  };
  let claves = Object.keys(localStorage);
  let forPaySeparated = [];
  let forPay = 0;

  if (localStorage.length > 1) {
    for (let i = 0; i < claves.length; i++) {
      let clave = claves[i];
      if (clave.startsWith("price")) {
        forPaySeparated.push(parseFloat(localStorage[clave]));
      }
    }
    forPay = forPaySeparated.reduce((a, b) => a + b);
  } else {
    forPay = 0;
  }
  console.log(forPay);

  const deleteFromCart = id => {
    dispatch(remove_one_from_cart(id));
  };
  let [totalPrice, setTotalPrice] = useState("");
  let [clicked, setClicked] = useState(0);
  //console.log(CartItem)
  //puedo recorrer el cart para sumar los precios,pero falta de dnd vienen las cantidades

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
      <div>
        <Payment/>
      </div>
    </div>
  );
}
