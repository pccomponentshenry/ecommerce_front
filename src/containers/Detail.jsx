import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import Carousel from "../components/DetailCarousel";
import Reviews from "../components/Reviews";
import DetailInfo from "../components/DetailInfo";
import { useNavigate } from "react-router-dom";
import { addToCart, getProductDetail, postCartItem } from "../redux/actions";
import D from "../styles/Detail.module.css";
import back from "../Images/back.png";

export default function Detail() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const isDarkMode = useSelector(state => state.isDarkMode);
  const { user, isAuthenticated } = useAuth0();

  const handleAddToCart = () => {
    if (isAuthenticated) {
      const post = {
        id: product.id,
        quantity: 1,
        email: user.email,
        add: true,
      };
      dispatch(postCartItem(post));
    } else {
      dispatch(addToCart(product, isAuthenticated));
    }
    successAlert();
  };

  useEffect(() => {
    dispatch(getProductDetail(params.id));
  }, [dispatch]);

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
      if (result.isConfirmed) {
        navigate("/");
      } else if (result.isDenied) {
        navigate("/cart");
      }
    });
  };

  const imgs = [];
  imgs.push(product.img);
  imgs.push(product.img);

  return (
    <div className={D.Container}>
      <div className={D.back} onClick={() => navigate(-1)}>
        <img className={ isDarkMode === true ? D.backImgDark : D.backimg} src={back} alt="" />
      </div>
      <div className={D.imageContainer}>
        <Carousel img={imgs} />
      </div>
      <div className={D.infoContainer}>
        <DetailInfo handleAddToCart={handleAddToCart} />
      </div>

      <div className={D.Reviews}>
        <Reviews id={params.id} />
      </div>
    </div>
  );
}
