import React from "react";
import D from "../styles/Detail.module.css";
import Carousel from "../components/DetailCarousel";
import Reviews from "../components/Reviews";
import { Link } from "react-router-dom";

export default function Detail() {
  const owner = [
    {
      name: "Ricardo Fort",
      profilePic: [
        "https://elcordillerano1.cdn.net.ar/252/elcordillerano/images/01/02/09/1020965_365fc4b732ec9f9283a8eddbadc8115e92650b2e92217715fe312e6fa7b90d82/sm.webp",
      ],
    },
  ];
  const products = [
    {
      category: "Headphones",
      title: "Headphones XAS-305>",
      brand: "Nisuta",
      stock: 2,
      price: "$185.02",
      description:
        "Fabuloso teclado con muchos colores y lleno de teclas. Sirve para programar un montón.",
      img: [
        "https://d2r9epyceweg5n.cloudfront.net/stores/001/130/715/products/teclado-xk7001-b9f340ca1d65e4e69d16038383176727-1024-1024.jpg",
        "https://d2r9epyceweg5n.cloudfront.net/stores/001/130/715/products/teclado-xk700-31-f87dac24f328c065b516038383173232-1024-1024.jpg",
        "https://d2r9epyceweg5n.cloudfront.net/stores/650/868/products/sfdgasg1-f63a1338a32a894eab16038914603768-1024-1024.jpg",
      ],
    },
  ];
  return (
    <div className={D.Container}>
      <div className={D.imageContainer}>
        <Carousel img={products[0].img} />
      </div>
      {/* reviews.length > 0 &&  ---- Depende de lo que llegue del back */}
      <Reviews />
      <div className={D.dataContainer}>
        <span className={D.category}>{products[0].category}</span>
        <div className={D.nameCont}>
          <h1 className={D.name}>{products[0].name}</h1>
        </div>
        <h3 className={D.brand}>Brand: {products[0].brand}</h3>
        <p className={D.description}>{products[0].description}</p>
        <span className={D.stock}>{products[0].stock} units</span>
        <h3 className={D.price}>Price: {products[0].price}</h3>
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
            <h3>{owner[0].name}</h3>
            <p>See the seller's rating</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
