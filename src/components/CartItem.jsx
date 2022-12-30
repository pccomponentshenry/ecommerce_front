import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, postCartItem } from "../redux/actions";
import C from "../styles/CartItem.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

export default function CartItem({ item }) {
  const { id, title, img, price, quantity, stock } = item;
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth0();

  const handleAddToCart = () => {
    if (quantity !== stock) {
      if (isAuthenticated) {
        const post = { id, quantity: 1, email: user.email, add: true };
        dispatch(postCartItem(post));
      }
      dispatch(addToCart(item, isAuthenticated));
    }
  };

  const handleRemoveItemFromCart = () => {
    if (isAuthenticated) {
      const post = { id, quantity, email: user.email };
      dispatch(postCartItem(post));
    }
    dispatch(removeFromCart(item, true));
  };

  const handleRemoveOneFromCart = () => {
    if (isAuthenticated) {
      const post = { id, quantity: 1, email: user.email, del: true };
      dispatch(postCartItem(post));
    }
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
              handleRemoveItemFromCart();
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
            <Link to={'/detail/'+id}><img className={C.imageItem} src={img} alt="" /></Link>
          </div>
          <Link to={'/detail/'+id}><h4 className={C.link}>{title.substr(0, 30) + "..."}</h4></Link>
        </div>

        {/* <h5 className={C.price}>Unit Price ${price}</h5> */}
        <p className={C.price}>
          Total: ${parseFloat(price * quantity).toFixed(2)}
        </p>
      </div>
    </>
  );
}
