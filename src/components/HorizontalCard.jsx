import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
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
    if (isAuthenticated) {
      const post = { id: props.id, quantity: 1, email: user.email, add: true };
      dispatch(postCartItem(post));
    }
    else {
      dispatch(addToCart(props.product, isAuthenticated));
    }
    successAlert();
  };

  useEffect(() => {
    if (favs) {
      favs.find(fav => fav.id === props.product.id) ? setActive(true) : setActive(false);
    }
  }, [favs])

  const handleAddToFav = () => {
    dispatch(updateFavs(props.product, user.id));
    favs.find(fav => fav.id === props.product.id) ? setActive(true) : setActive(false);
  };

  const successAlert = () => {
    Swal.fire({
      title: "Product Added to cart!",
      confirmButtonText: "Les't buy more products",
      showDenyButton: true,
      denyButtonText: `No, Go to my Cart`,
      icon: "success",
      confirmButtonColor: "rgb(55, 172, 135)",
      denyButtonColor: "#d83dd0",
      background: "#272727",
      color: "#fff",
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate("/");
      } else if (result.isDenied) {
        navigate("/cart");
      }
    });
  };

  const successFavAlert = () => {
    if (props.clickFromFav === true) {
      props.setClicked(!props.clicked);
    }
  };

  return (
    <>
      <div className={C.cardContainer}>
        <div className={C.imgContainer}>
          <Link to={`/detail/${props.id}`}>
            <img src={props.img} alt="" className={C.image} />
          </Link>
        </div>

        <div className={C.nameCont}>
          <h6 className={C.name}>{props.title}</h6>
          <h6 className={C.brand}>{props.brand}</h6>
        </div>

        <h6 className={C.price}>$ {props.price}</h6>

        <button className={C.cardBtn} onClick={handleAddToCart}>
          Add to cart
        </button>
        <span
          className={active ? C.active : C.fav}
          onClick={handleAddToFav}
        >
          ❤
        </span>
      </div>
    </>
  );
}

export default HorizontalCard;
