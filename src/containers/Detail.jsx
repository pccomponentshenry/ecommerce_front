import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import D from "../styles/Detail.module.css";
import Carousel from "../components/DetailCarousel";
import Reviews from "../components/Reviews";
import Swal from "sweetalert2";
import { addToCart, getProductDetail, postCartItem } from "../redux/actions";
import NotFound from "../alerts/NotFound";

export default function Detail() {
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const { user, isAuthenticated } = useAuth0();
  const creator = product.creator;
  let guest = "default";
  user ? guest = user.nickname : guest = "default";

  /*  const guess = user.nickname */
  /*  console.log(creator, guess) */

  const handleAddToCart = () => {
    if (isAuthenticated) {
      const post = { id: product.id, quantity: 1, email: user.email, add: true };
      dispatch(postCartItem(post));
    }
    dispatch(addToCart(product, isAuthenticated));
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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate("/");
      } else if (result.isDenied) {
        navigate("/cart");
      }
    });
  };

  //TODO: change hardcoded data
  //console.log(product)
  const owner = [
    {
      name: "Usuario 1",
      profilePic: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
      ],
    },
  ];
  const imgs = [];
  imgs.push(product.img);
  imgs.push(product.img);

  return (
    <div className={D.Container}>
      <div className={D.imageContainer}>
        <Carousel img={imgs} />
      </div>
      {/* reviews.length > 0 &&  ---- Depende de lo que llegue del back */}
      <Reviews />
      <div className={D.dataContainer}>
        <span className={D.category}>{product.category}</span>
        <h3 className={D.name}>{product.title}</h3>
        {/* <div className={D.nameCont}>
          <h1 className={D.name}>{product.title}</h1>
        </div> */}
        <h3 className={D.brand}>Brand: {product.brand}</h3>
        <p className={D.description}>{product.description}</p>
        <span className={D.stock}>{product.stock} units</span>
        <h3 className={D.price}>Price: {product.price}</h3>
      </div>
      <div className={D.btnCont}>
        <button onClick={handleAddToCart}>Add to cart</button>
        <span>♡</span>
      </div>
      <div className={D.owner}>
        <div className={D.ProfilePicCont}>
          <img src={owner[0].profilePic} alt="" className={D.profilePic} />
        </div>
        <Link to="/user/1" style={{ textDecoration: "none", color: "white" }}>
          <div className={D.ownerText}>
            <h3>{product.creator}</h3>
            <p>See the seller's rating</p>
          </div>
        </Link>
      </div>
      {
        creator === guest ?

          <button>update</button>

          : <></>
      }
      {
        creator === guest ? <button>delete</button> : <></>
      }

    </div>
  );
}
