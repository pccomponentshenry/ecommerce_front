import React from "react";
import C from "../styles/CartItem.module.css";
import { useState } from "react";

export default function CartItem({ data, deleteFromCart }) {
  const { id, title, img, brand, price, quantity } = data;

  const cart = JSON.parse(localStorage.getItem("cart"));

  const quantityStorage = localStorage.getItem("quantity")
    ? JSON.parse(localStorage.getItem("quantity"))
    : 1;
  let [quantityState, setQuantityState] = useState(quantityStorage);

  React.useEffect(() => {
    localStorage.setItem("quantity", JSON.stringify(quantityState));
  }, [quantityState]);

  const setQuantityInput = e => {
    // if (e.target.innerText === "+") {
    //   setQuantityState(quantity + 1);

    // }

    setQuantityState(quantityState++);
    // localStorage.setItem("quantity", JSON.stringify(quantityState));
    // window.localStorage.setItem("quantity", JSON.stringify(quantityInput));
    // if (e.target.innerText === "-" && quantity > 0) {
    //   //  setQuantity(quantity--);
    // }
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
            <button className={C.Btn} id="-" onClick={e => setQuantityInput(e)}>
              -
            </button>
            <span>{quantityStorage} </span>
            <button
              className={C.plus}
              id="+"
              onClick={e => setQuantityInput(e)}
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
