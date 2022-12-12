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
    <>
      <div className={S.container}>
        <div className={S.titleCont}>
          <h4 className={S.title}>Shopping Cart</h4>
        </div>

        <div className={S.clearCont}>
          <button className={S.clearBtn} onClick={clearCart}>
            Clean Cart
          </button>
        </div>
        <div className={S.cartArea}>
          {cart.map((el, index) => (
            <CartItem
              setTotalPrice={setTotalPrice}
              clicked={clicked}
              setClicked={setClicked}
              totalPrice={totalPrice}
              key={index}
              data={el}
              deleteFromCart={deleteFromCart}
            />
          ))}
        </div>
        <h3 className={S.total}>Total: ${parseFloat(forPay).toFixed(2)}</h3>
        <div className={S.startShopping}>
          <span>Start shopping</span>
        </div>
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
