import React from "react";
import D from "../styles/Detail.module.css";
import Carousel from "../components/DetailCarousel";
import Reviews from "../components/Reviews";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../redux/actions";
import { useEffect } from "react";
import NotFound from "../alerts/NotFound";
import { useAuth0 } from "@auth0/auth0-react";

export default function Detail() {
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const { user} = useAuth0();
  const creator= product.creator;
  var guess = "default"
  {user ?  guess = user.nickname : guess = "default"}
  
   /*  const guess = user.nickname */
  
    
 /*  console.log(creator, guess) */

  useEffect(() => {
    dispatch(getProductDetail(params.id));
  }, [dispatch]);

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
        <button>Add to cart</button>
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
        creator === guess? 
       
        <button>update</button> 
        
        : <></>
      }
      {
        creator === guess? <button>delete</button> : <></>
      }
     
    </div>
  );
}
