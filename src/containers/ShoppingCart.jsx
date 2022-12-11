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
  let [totalPrice, setTotalPrice] = useState("");
  let [clicked, setClicked] = useState(0);

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
              key={index}
              data={el}
              deleteFromCart={deleteFromCart}
            />
          ))}
        </div>
        <h3 className={S.total}>Total: ${parseFloat(totalPrice).toFixed(2)}</h3>
        <div className={S.startShopping}>
          <span>Start shopping</span>
        </div>
      </div>
      <div className={S.imgCont}>
        <h1>Just one step to become a pro</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
        </p>
        <img
          src="https://res.cloudinary.com/dbtekd33p/image/upload/v1670795674/cqws5x8n/gamer_urddyh.jpg"
          alt=""
        />
      </div>
    </>
  );
}
