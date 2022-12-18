import React from "react";
import U from "../styles/UserFav.module.css";
import HorizontalCard from "./HorizontalCard";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserFav() {
  const favs = JSON.parse(localStorage.getItem("fav"));
  const [favorites, setFavorites] = useState(favs);
  const [clicked, setClicked] = useState(false);

  React.useEffect(() => {
    setFavorites(favs);
  }, [clicked]);

  return (
    <div>
      <div className={U.container}>
        <h5>
          {favorites.length > 0 && favorites.length === 1
            ? `This is your top favorite product`
            : favorites.length > 1
            ? `These are your top ${favorites.length} favorite products`
            : null}
        </h5>
      </div>
      <div className={U.itemsContainer}>
        <div className={U.favContainer}>
          {favorites.length > 0 ? (
            favorites.map((el, i) => (
              <HorizontalCard
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
            <div className={U.noProducts}>
              <h5>You haven't any favorite products yet!</h5>
              <Link to="/" style={{ textDecoration: "none" }}>
                <p>Choose your favorites!</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
