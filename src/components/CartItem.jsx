import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions";
import C from "../styles/CartItem.module.css";

export default function CartItem({ item }) {

  const { title, img, price, quantity } = item;
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  const handleDeleteFromCart = () => {
    dispatch(removeFromCart(item, true));
  };

  const handleRemoveOneFromCart = () => {
    dispatch(removeFromCart(item, false));
  };

  return (
    <>
      <div className={C.card}>
        <div className={C.btnCont}>
          <button
            onClick={() => {
              handleDeleteFromCart();
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
              onClick={handleRemoveOneFromCart}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className={C.plus}
              id="+"
              onClick={handleAddToCart}
            >
              +
            </button>
          </div>
        </div>
        {/* <h5 className={C.price}>Unit Price ${price}</h5> */}
        <p className={C.price}>Total: ${parseFloat(price * quantity).toFixed(2)}</p>
      </div>
    </>
  );
}
