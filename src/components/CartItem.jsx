import React from "react";

export default function CartItem({ data, deleteFromCart }) {
  const { id, title, img, brand, price, quantity } = data;
  return (
    <div style={{ border: "thin solid gray", color: "white" }}>
      <h4>{title}</h4>
      <h5>
        ${price}x{quantity}=${quantity * price}
      </h5>
      <button onClick={() => deleteFromCart(id)}>Delete One</button>
    </div>
  );
}
