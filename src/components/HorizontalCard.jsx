import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addToCart, updateFavs, postCartItem } from "../redux/actions";
import C from "../styles/HorizontalCard.module.css";

function HorizontalCard(props) {
  const user = useSelector(state => state.user);
  const favs = useSelector(state => state.favs);
  const [active, setActive] = useState(favs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const post = { id: props.id, quantity: 1, email: user.email, add: true };
    dispatch(postCartItem(post));
    successAlert();
  };

  useEffect(() => {
    if (favs) {
      favs.find(fav => fav.id === props.product.id)
        ? setActive(true)
        : setActive(false);
    }
  }, [favs]);

  const handleAddToFav = () => {
    dispatch(updateFavs(props.product, user.id));
    favs.find(fav => fav.id === props.product.id)
      ? setActive(true)
      : setActive(false);
  };

  const successAlert = () => {
    Swal.fire({
      title: "Product Added to cart!",
      confirmButtonText: "Back to profile",
      showDenyButton: true,
      denyButtonText: `Go to my Cart`,
      icon: "success",
      confirmButtonColor: "rgb(55, 172, 135)",
      denyButtonColor: "#d83dd0",
      background: "#272727",
      color: "#fff",
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // navigate("/");
      } else if (result.isDenied) {
        navigate("/cart");
      }
    });
  };

  return (
    <>
      <div className={C.cardContainer}>
        <Link to={`/detail/${props.id}`}>
          <div className={C.imgContainer}>
            <img src={props.img} alt="" className={C.image} />
          </div>
          <div className={C.nameCont}>
            <h6 className={C.name}>{props.title}</h6>
            <h6 className={C.brand}>{props.brand}</h6>
            <h6 className={C.price}>$ {props.price}</h6>
          </div>
        </Link>

        <button className={C.cardBtn} onClick={handleAddToCart}>
          Add to cart
        </button>
        <span className={active ? C.active : C.fav} onClick={handleAddToFav}>
          ♥
        </span>
      </div>
    </>
  );
}

export default HorizontalCard;
