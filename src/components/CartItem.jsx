import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, putCartItem, postCartItem } from "../redux/actions";
import C from "../styles/CartItem.module.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function CartItem({ item }) {
  const { title, img, price, quantity } = item;
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0();  

  const handleAddToCart = () => {
    {isAuthenticated? dispatch (postCartItem(item)):dispatch(addToCart(item)) }
  };

  const handleDeleteFromCart = () => {
    dispatch(removeFromCart(item, true));
  };

  const handleRemoveOneFromCart = () => {
    {isAuthenticated? dispatch (putCartItem(item, false)):dispatch(removeFromCart(item, false)) }
    dispatch(removeFromCart(item, false));
  };

  return (
    <>
      <div className={C.card}>
        <div className={C.counterContainer}>
          <div className={C.counter}>
            <button className={C.Btn} id="-" onClick={handleRemoveOneFromCart}>
              -
            </button>
            <span>{item.quantity}</span>
            <button className={C.plus} id="+" onClick={handleAddToCart}>
              +
            </button>
          </div>
        </div>
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
          <h4>{title.substr(0, 30) + "..."}</h4>
        </div>

        {/* <h5 className={C.price}>Unit Price ${price}</h5> */}
        <p className={C.price}>
          Total: ${parseFloat(price * quantity).toFixed(2)}
        </p>
      </div>
    </>
  );
}
