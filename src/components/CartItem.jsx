import React from "react";
import C from "../styles/CartItem.module.css";
import { useState } from "react";

export default function CartItem({ data, deleteFromCart, setTotalPrice }) {
  const { id, title, img, brand, price, stock } = data;

  const cart = JSON.parse(localStorage.getItem("cart"));
  const quant = JSON.parse(localStorage.getItem(id)) || 1;
  const priceProduct = JSON.parse(localStorage.getItem("price " + id)) || price;

  let [state, setState] = useState(quant);
  let [priceState, setPriceState] = useState(priceProduct);
  let [clicked, setClicked] = useState(false);

  const setQuantityInput = productId => {
    for (let product of cart) {
      if (product.id === productId && state < stock) {
        setState(state + 1);
        setPriceState(priceState + price);
        localStorage.setItem(id, JSON.stringify(quant + 1));
        localStorage.setItem(
          "price " + id,
          JSON.stringify(priceProduct + price)
        );
      }
    }

    setTotalPrice(
      priceProduct.length > 0 && cart.length > 0
        ? priceProduct * cart.length
        : parseFloat(priceState).toFixed(2) * 1
    );
  };

  const decreaseQuantityInput = productId => {
    if (state !== 1) {
      for (let product of cart) {
        if (product.id === productId) {
          setState(state - 1);
          setPriceState(priceState - price);
          localStorage.setItem(id, JSON.stringify(quant - 1));
          localStorage.setItem(
            "price " + id,
            JSON.stringify(priceProduct - price)
          );
        }
      }
    }
    setTotalPrice(
      priceProduct.length > 0 && cart.length > 0
        ? priceProduct * cart.length
        : parseFloat(priceState).toFixed(2) * 1
    );
  };

  return (
    <>
      <div className={C.card}>
        <div className={C.btnCont}>
          <button
            onClick={() => {
              deleteFromCart(id);
              setClicked(!clicked);
            }}
          >
            <img
              src="https://res.cloudinary.com/dbtekd33p/image/upload/v1670819389/cqws5x8n/iconmonstr-trash-can-27-240_gtmmpc.png"
              alt=""
            />
          </button>
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
        {/* <h5 className={C.price}>${price}</h5> */}
        <p className={C.price}>Total: ${parseFloat(priceState).toFixed(2)}</p>
      </div>
    </>
  );
}
