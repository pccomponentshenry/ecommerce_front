import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkout, postOrder } from "../redux/actions";
import P from "../styles/Payment.module.css";

function Payment({ addressId }) {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user);
  const [disable, setDisable] = useState(false);
  const order = [];

  const handleCheckout = e => {
    e.preventDefault();
    createOrder();
    const product = [];
    cart.map(e => {
      let line = {
        name: e.title,
        quantity: e.quantity,
        price: Math.round(e.price * 100),
        images: [e.img],
      };
      product.push(line);
    });

    const productObj = { products: product };
    dispatch(checkout(productObj));
  };

  const createOrder = () => {
    cart.map(item => {
      const orderItem = {};
      orderItem.productId = item.id;
      orderItem.price = item.price;
      orderItem.quantity = item.quantity;
      order.push(orderItem);
    });
    dispatch(postOrder(user.id, addressId, order));
  };

  return (
    <div className={P.container}>
      <button disabled={disable || !addressId} className={addressId && !disable ? P.enabled : P.disabled} role="link" onClick={(e) => { setDisable(true); handleCheckout(e) }}>
        Checkout
      </button>
    </div>
  );
}

export default Payment;
