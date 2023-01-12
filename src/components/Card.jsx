import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { addToCart, updateFavs, postCartItem } from "../redux/actions";
import C from "../styles/Card.module.css";
import { MdMode } from "react-icons/md";

function CardComponent(props) {
  const favs = useSelector(state => state.favs);
  const loggedUser = useSelector(state => state.user);
  const isDarkMode = useSelector(state => state.isDarkMode);
  const { isAuthenticated, user } = useAuth0();
  const [active, setActive] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (isAuthenticated) {
      const post = {
        id: props.product.id,
        quantity: 1,
        email: user.email,
        add: true,
      };
      dispatch(postCartItem(post));
    } else {
      dispatch(addToCart(props.product, isAuthenticated));
    }
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
    dispatch(updateFavs(props.product, loggedUser.id));
    favs.find(fav => fav.id === props.product.id)
      ? setActive(true)
      : setActive(false);
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

  return (
    <>
      {loggedUser.isAdmin === "true" ? (
        <div
          className={
            isDarkMode === true ? C.cardContainer : C.cardContainerLight
          }
        >
          <div className={C.imgContainer}>
            <Link to={`/update/${props.id}`}>
              <div className={C.contEdit}>
                <MdMode size="2em" />
              </div>
            </Link>
            <Link to={`/detail/${props.id}`}>
              <img src={props.img} alt="" className={C.imageEdit} />
            </Link>
          </div>
          <Link to={`/detail/${props.id}`}>
            <div className={C.square}>
              <div className={C.nameCont}>
                <h6 className={C.name}>{props.title}</h6>
                <h6 className={C.brand}>{props.brand}</h6>
              </div>
              <div className={C.bottomCont}>
                <h6 className={C.price}>$ {props.price}</h6>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div
          className={
            isDarkMode === true ? C.cardContainer : C.cardContainerLight
          }
        >
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
                <div className={C.cardBtn} onClick={handleAddToCart}>
                  Add to cart
                </div>
                <span
                  className={active ? C.active : C.fav}
                  onClick={handleAddToFav}
                >
                  ♥
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardComponent;
