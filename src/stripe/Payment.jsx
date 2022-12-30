import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import P from "../styles/Payment.module.css";
import { useSelector } from "react-redux";

const stripePromese = loadStripe(
  "pk_test_51MCUPjIxZNdfrxaORwUsMY8yxCPm4xhLtIsruiYWFCGr2xN6NzNOR984Z0gGfM8l8u2blkELjULUs1rbClLtmW9A00QbQXD9FC"
);

function Payment() {
  const cart = useSelector(state => state.cart);

  //let claves = Object.keys(localStorage);

  const handleClick = async e => {
    e.preventDefault();
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

    const productObj = {
      products: product,
    };
    const stripe = await stripePromese;
    const response = await fetch("http://localhost:3001/api/checkout", {
      method: "POST",
      body: JSON.stringify(productObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };
  return (

    <div className={P.container}>
      <button className={P.btn} role="link" onClick={e => handleClick(e)}>

    <div>
      <button
        style={{
          border: "none",
          background: "none",
          color: "black",
          position: "relative",
          top: "10px",
          fontSize: "18px",
          fontWeight:"500",
          width: "700px",
        }}
        role="link"
        onClick={e => handleClick(e)}
      >

        Start shopping
      </button>
    </div>
  );
}

export default Payment;
