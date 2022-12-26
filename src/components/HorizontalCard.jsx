import C from "../styles/HorizontalCard.module.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addToCart, addToFav, postCartItem } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function HorizontalCard(props) {
  const { isAuthenticated, user } = useAuth0();
  const fav = localStorage.getItem(props.id)
    ? JSON.parse(localStorage.getItem(props.id))
    : [];

  const [active, setActive] = useState(fav);
  // const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (isAuthenticated) {
      const post = { id: props.id, quantity: 1, email: user.email, add: true };
      dispatch(postCartItem(post));
    }
    dispatch(addToCart(props.product, isAuthenticated));
    successAlert();
  };

  React.useEffect(() => {
    setActive(fav);
  }, [props.clicked]);

  const handleAddToFav = () => {
    dispatch(addToFav(props.product));
    successFavAlert();
    props.setClicked(!props.clicked);
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
          className={active === true ? C.active : C.fav}
          onClick={handleAddToFav}
        >
          ❤
        </span>
      </div>
    </>
  );
}

export default HorizontalCard;
