import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFavs } from "../redux/actions";
import D from "../styles/Detail.module.css";

export default function DetailInfo({ handleAddToCart }) {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const brand = useSelector(state => state.brands);
  const user = useSelector(state => state.user);
  const favs = useSelector(state => state.favs);
  const [stars, setStars] = useState(0);
  const [active, setActive] = useState();

  const profilePic =
    user.image ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU";

  useEffect(() => {
    if (product.id) {
      setStars(product.avgStars);
    }
  }, [product]);

  
  useEffect(() => {
    if (favs && product) {
      favs.find(fav => fav.id === product.id)
        ? setActive(true)
        : setActive(false);
    }
  }, [favs, product]);

  const handleAddToFav = () => {
    dispatch(updateFavs(product, user.id));
    favs.find(fav => fav.id === product.id)
      ? setActive(true)
      : setActive(false);
  };

  return (
    <div className={D.topContainer}>
      <div className={D.dataContainer}>
        <span className={D.category}>{product.category}</span>
        <div className={D.titleContainer}>
          <h3 className={D.name}>{product.name}</h3>
        </div>
        <h3 className={D.brand}>Brand: {product.brand} </h3>
        <span className={D.stock}>{product.stock} units</span>
        <div className={D.priceAndDescription}>
          <h3 className={D.price}>$ {product.price}</h3>
          <p className={D.description}>{product.description}</p>
        </div>
        {stars ? (
          <div className={D.rating}>
            <div>
              <label className={D.ratingTitle}>
                <strong>
                  Product Rating:{" "}
                  <span style={{ color: "#2bfab7" }}>{stars}</span>
                </strong>
              </label>
            </div>
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <label
                  key={i}
                  className={
                    stars >= ratingValue
                      ? D.fullStar
                      : Math.ceil(stars) >= ratingValue
                      ? D.halfStar
                      : D.emptyStar
                  }
                >
                  ★
                </label>
              );
            })}
          </div>
        ) : (
          <div>
            <label className={D.ratingTitle}>
              <span className={D.ratingText}>
                No reviews yet
              </span>
            </label>
            <label className={D.emptyStar}>★★★★★</label>
          </div>
        )}
        {user.isAdmin === "true" ? (
          ""
        ) : (
          <div className={D.btnCont}>
            <button onClick={handleAddToCart}>Add to cart</button>
            <span
              className={active === true ? D.active : D.fav}
              onClick={handleAddToFav}
            >
              ♥
            </span>
          </div>
        )}

        {/* <div className={D.owner}>
          <div className={D.ProfilePicCont}>
            <img src={profilePic} alt="" className={D.profilePic} />
          </div>
          <div className={D.ownerText}>
            <h2>Seller</h2>
            <h3>{product?.user?.username}</h3>
          </div>
          {/* <Link to="/user/1" style={{ textDecoration: "none", color: "white" }}>
            <div className={D.ownerText}>
              <h3>{product?.user?.username}</h3>
              <p>See the seller's profile</p>
            </div>
          </Link> */}
        {/* </div> */}
        {/* {product.user === user.id ? (
          <div className={D.editBtn}>
            <button>update</button>
            <button>delete</button>
          </div>
        ) : (
          <></>
        )} */}
      </div>
    </div>
  );
}
