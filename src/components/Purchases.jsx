import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, getReviews } from "../redux/actions";
import P from "../styles/Purchases.module.css";

export default function Purchases() {
  const nuevo = [];
  const usuario = [];
  const user = useSelector(state => state.user);
  const purchases = useSelector(state => state.purchases);
  const reviews = useSelector(state => state.reviews);
  reviews.map(i => nuevo.push(i.productId));
  reviews.map(e => usuario.push(e.username));
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getReviews());
    dispatch(getOrders(user.id));
    setIsLoading(false);
  }, [user])

  return (
    <div>
      {isLoading ? <div>Loading...</div> : purchases.length ? purchases.map(p => (
        <div className={P.orderBox} key={p.id}>
          <h4>
            Order PE000{p.id}
          </h4>
          <span className={`${p.status === "completed" ? P.completed : {}} ${p.status === "cancelled" ? P.cancelled : {}}`}>
            {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
          </span>
          <h6 className={`${p.status === "completed" ? P.dateCompleted : {}} ${p.status === "cancelled" ? P.dateCancelled : {}}`}>
            {p.status === "completed" ? "Purchase Date:" : "Date:"} {p.purchaseDate.substr(0, 10)}
          </h6>
          {p.orderItems.map(el => (
            <div className={P.orderCard} key={el.id}>
              <div className={P.imageCont}>
                <img src={el.product.img} alt="" />
              </div>
              <div className={P.cardInfo}>
                <Link
                  style={{ textDecoration: "none", color: "#212121" }}
                  to={`/detail/${el.product.id}`}
                >
                  <h3>{el.product.title}</h3>
                </Link>
                <h5>
                  {el.quantity} Units - ${el.price}
                </h5>
                {(!nuevo.includes(el.product.id) || !usuario.includes(user.username)) ?
                  <Link
                    style={{ textDecoration: "none", color: "#212121" }}
                    to={`/addreview/${user.id}/${el.product.id}`}
                  >
                    {" "}
                    <button>Leave a review</button>{" "}
                  </Link>
                  : <div>Review posted</div>}
              </div>
            </div>
          ))}
        </div>
      )) :
        (
          <div className={P.noProducts}>
            <h5>You don't have any purchases yet!</h5>
            <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
              <p>Choose your favorites!</p>
            </Link>
          </div>)

      }
    </div>
  );
}
