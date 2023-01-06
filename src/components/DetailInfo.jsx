import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import D from "../styles/Detail.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addToFav } from "../redux/actions";

export default function DetailInfo({ handleAddToCart }) {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const user = useSelector(state => state.user);
  const [clicked, setClicked] = useState(false);
  const fav = localStorage.getItem(product.id)
    ? JSON.parse(localStorage.getItem(product.id))
    : [];
  const [active, setActive] = useState(fav);

  const profilePic =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU";

  useEffect(() => {
    setActive(fav);
  }, [clicked]);

  const handleAddToFav = () => {
    dispatch(addToFav(product));
    setClicked(!clicked);
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
            <img src={profilePic} alt="" className={D.profilePic} />
          </div>
          <Link to="/user/1" style={{ textDecoration: "none", color: "white" }}>
            <div className={D.ownerText}>
              <h3>{product?.user?.username}</h3>
              <p>See the seller's profile</p>
            </div>
          </Link>
        </div>
        {product.user === user.id ? (
          <div className={D.editBtn}>
            <button>update</button>
            <button>delete</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
