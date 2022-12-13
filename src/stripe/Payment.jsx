import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";

const stripePromese = loadStripe(
  "pk_test_51MCUPjIxZNdfrxaORwUsMY8yxCPm4xhLtIsruiYWFCGr2xN6NzNOR984Z0gGfM8l8u2blkELjULUs1rbClLtmW9A00QbQXD9FC"
);

function Payment() {
  const cart = useSelector(state => state.cart);
  console.log(cart);
  let claves = Object.keys(localStorage);
  console.log("este es quant", claves);

  const handleClick = async e => {
    e.preventDefault();
    const product = [];
    cart.map(e => {
      let line = {
        name: e.title,
        quantity: claves.includes(e.id) ? localStorage.getItem(e.id) : 1,
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
      console.log(result.error);
    }
  };
  return (
    <div>
      <button
        style={{
          border: "none",
          background: "none",
          color: "white",
          position: "relative",
          top: "10px",
          fontSize: "18px",
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
