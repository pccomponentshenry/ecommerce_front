import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkout, postOrder } from "../redux/actions";
import P from "../styles/Payment.module.css";

function Payment({ addressId }) {
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user);
  const order = [];
  const dispatch = useDispatch();

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
      <button role="link" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
}

export default Payment;
