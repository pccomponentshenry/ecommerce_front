import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { addToCart, addToFav, postCartItem } from "../redux/actions";
import C from "../styles/Card.module.css";

function CardComponent(props) {
  const fav = localStorage.getItem(props.id)
    ? JSON.parse(localStorage.getItem(props.id))
    : [];
  const { isAuthenticated, user } = useAuth0();
  const [active, setActive] = useState(fav);
  const [clicked, setClicked] = useState(false);
  const favs = JSON.parse(localStorage.getItem("fav"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleAddToCart = () => {
  //   if (isAuthenticated) {
  //     const post = {
  //       id: props.product.id,
  //       quantity: 1,
  //       email: user.email,
  //       add: true,
  //     };
  //     dispatch(postCartItem(post));
  //   }
  //   dispatch(addToCart(props.product, isAuthenticated));
  //   successAlert();
  // };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      const post = {
        id: props.product.id,
        quantity: 1,
        email: user.email,
        add: true,
      };
      dispatch(postCartItem(post));
    }
    dispatch(addToCart(props.product, isAuthenticated));
    successAlert();
  };

  React.useEffect(() => {
    setActive(fav);
  }, [clicked]);

  const handleAddToFav = () => {
    dispatch(addToFav(props.product));
    successFavAlert();
    setClicked(!clicked);
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
      props.setClicked(!clicked);
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
        <div className={C.square}>
          <div className={C.nameCont}>
            <h6 className={C.name}>{props.title}</h6>
          </div>
          <h6 className={C.brand}>{props.brand}</h6>
          <div className={C.bottomCont}>
            <h6 className={C.price}>$ {props.price}</h6>
            <div className={C.btnAndFav}>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default CardComponent;
