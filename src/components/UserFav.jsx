import React from "react";
import U from "../styles/UserFav.module.css";
import HorizontalCard from "./HorizontalCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UserFav() {
  const favList = useSelector(state => state.favs);
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <div className={U.container}>
        <h5>
          {favList.length > 0 && favList.length === 1
            ? `This is your top favorite product`
            : favList.length > 1
            ? `These are your top ${favList.length} favorite products`
            : null}
        </h5>
      </div>
      <div className={U.itemsContainer}>
        <div className={U.favContainer}>
          {favList.length > 0 ? (
            favList.map((el, i) => (
              <HorizontalCard
                key={i}
                title={el.title.substr(0, 55) + "..."}
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
              <h5>You don't have any favorite products yet!</h5>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <p>Choose your favorites!</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
