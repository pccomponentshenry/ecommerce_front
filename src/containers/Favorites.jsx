import React from "react";
import F from "../styles/Favorites.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import CardComponent from "../components/Card";
import { Link } from "react-router-dom";

export default function Favorites() {
  const favList = useSelector(state => state.fav);
  const cart = useSelector(state => state.cart);
  const favs = JSON.parse(localStorage.getItem("fav"));
  const [favorites, setFavorites] = useState(favs ? favs : favList);
  const [clicked, setClicked] = useState(false);

  React.useEffect(() => {
    setFavorites(favs ? favs : favList);
  }, [favs]);

  return (
    <>
      <div className={F.container}>
        <h5>
          {favorites.length === 1
            ? `This is your top favorite product`
            : favorites.length > 1
              ? `These are your top ${favorites.length} favorite products`
              : null}
        </h5>
      </div>
      <div className={F.itemsContainer}>
        <div className={F.favContainer}>
          {favorites.length > 0 ? (
            favorites.map((el, i) => (
              <CardComponent
                key={i}
                title={el.title.substr(0, 18) + "..."}
                price={el.price}
                img={el.img}
                id={el.id}
                product={el}
                clickFromFav={true}
                clicked={clicked}
                setClicked={setClicked}
              />
            ))
          ) : (
            <div className={F.noProducts}>
              <h5>You don't have any favorite products yet!</h5>
              <Link to="/" style={{ textDecoration: "none" }}>
                <p>Choose your favorites!</p>
              </Link>
            </div>
          )}
        </div>


      </div>

      <div className={F.BtnContainer}>
        <h5>
          You have {cart.length !== 0 && cart.length}
          {cart.length === 0
            ? `no items`
            : cart.length === 1
              ? ` item`
              : ` items`}{" "}
          in cart
        </h5>
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <button className={F.active}>Go to cart</button>
        </Link>
      </div>
    </>
  );
}
