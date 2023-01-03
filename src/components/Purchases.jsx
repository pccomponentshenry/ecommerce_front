import React from "react";
import P from "../styles/Purchases.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Purchases() {
  const user = useSelector(state => state.user);
  const order = {
    data: [
      {
        productId: 1,
        title: "Corsair Air Series SP120 Quiet Edition Single Fan",
        quantity: 2,
        price: 129.9,
        img: "https://images-na.ssl-images-amazon.com/images/I/41F7S5TOiTL._SL600_.jpg",
      },
      {
        productId: 2,
        title: "Noctua NF-A14 FLX, Premium Quiet Fan, 3-Pin (140mm, Brown)",
        quantity: 1,
        price: 22.99,
        img: "https://images-na.ssl-images-amazon.com/images/I/41Ya7lO5TAL._SL600_.jpg",
      },
      {
        productId: 5,
        title: "Be Quiet! Pure Wings 2 120mm, BL046, Cooling Fan",
        quantity: 5,
        price: 15.94,
        img: "https://images-na.ssl-images-amazon.com/images/I/41j1dWoCY0L._SL600_.jpg",
      },
    ],
  };

  return (
    <div>
      <div className={P.orderBox}>
        {order.data.map((el, i) => (
          <div className={P.orderCard}>
            <div className={P.imageCont}>
              <img src={el.img} alt="" />
            </div>
            <div className={P.cardInfo}>
              <Link
                style={{ textDecoration: "none", color: "#212121" }}
                to={`/detail/${el.productId}`}
                key={i}
              >
                <h3>{el.title}</h3>
              </Link>
              <h5>
                {el.quantity} Units - ${el.price}
              </h5>
              <Link
                style={{ textDecoration: "none", color: "#212121" }}
                to={`/addreview/${user.id}/${el.productId}`}
                key={i}
              >
                {" "}
                <button>Leave a review</button>{" "}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
