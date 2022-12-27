import React from "react";
import { useSelector, useDispatch } from "react-redux";
import D from "../styles/Detail.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addToFav } from "../redux/actions";

export default function DetailInfo({ handleAddToCart, owner, creator, guest }) {
  const product = useSelector(state => state.product);
  const fav = localStorage.getItem(product.id)
    ? JSON.parse(localStorage.getItem(product.id))
    : [];
  const [active, setActive] = useState(fav);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setActive(fav);
  }, [clicked]);

  const handleAddToFav = () => {
    dispatch(addToFav(product));
    setClicked(!clicked);
    console.log(fav);
    console.log(active);
  };

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
          <span
            className={active === true ? D.active : D.fav}
            onClick={handleAddToFav}
          >
            ❤
          </span>
        </div>
        <div className={D.owner}>
          <div className={D.ProfilePicCont}>
            <img src={owner[0].profilePic} alt="" className={D.profilePic} />
          </div>
          <Link to="/user/1" style={{ textDecoration: "none", color: "white" }}>
            <div className={D.ownerText}>
              <h3>{product.creator}</h3>
              <p>See the seller's profile</p>
            </div>
          </Link>
        </div>
        {creator === guest ? (
          <div className={D.editBtn}>
            <button class>update</button>
            <button>delete</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
