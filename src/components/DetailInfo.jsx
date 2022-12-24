import React from "react";
import { useSelector } from "react-redux";
import D from "../styles/Detail.module.css";
import { Link } from "react-router-dom";

export default function DetailInfo({ handleAddToCart, owner, creator, guest }) {
  const product = useSelector(state => state.product);
  return (
    <div className={D.topContainer}>
      <div className={D.dataContainer}>
        <span className={D.category}>{product.category}</span>
        <div className={D.titleContainer}>
          <h3 className={D.name}>{product.title}</h3>
        </div>
        <h3 className={D.brand}>Brand: {product.brand}</h3>
        <span className={D.stock}>{product.stock} units</span>
        <div className={D.priceAndDescription}>
          <h3 className={D.price}>$ {product.price}</h3>
          <p className={D.description}>{product.description}</p>
        </div>
        <div className={D.btnCont}>
          <button onClick={handleAddToCart}>Add to cart</button>
          <span>♡</span>
        </div>
        <div className={D.owner}>
          <div className={D.ProfilePicCont}>
            <img src={owner[0].profilePic} alt="" className={D.profilePic} />
          </div>
          <Link to="/user/1" style={{ textDecoration: "none", color: "white" }}>
            <div className={D.ownerText}>
              <h3>{product.creator}</h3>
              <p>See the seller's rating</p>
            </div>
          </Link>
        </div>
      </div>

      {creator === guest ? <button>update</button> : <></>}
      {creator === guest ? <button>delete</button> : <></>}
    </div>
  );
}
