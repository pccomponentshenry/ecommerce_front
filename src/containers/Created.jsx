import React from "react";
import CardsCreated from "../components/CardsCreated";
import C from "../styles/Created.module.css";
import add from "../Images/add.png";
import SideBar from "../components/SideMenuLogged";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Created() {
  const [active, setActive] = useState({
    A: true,
    B: false,
    C: false,
  });

  function setBtn(e) {
    if (e.target.id === "1") {
      setActive({ A: true, B: false, C: false });
      console.log(active);
    } else if (Number(e.target.id === "2")) {
      setActive({ A: false, B: true, C: false });
      console.log(active);
    } else if (Number(e.target.id === "3")) {
      setActive({ A: false, B: false, C: true });
    }
  }

  const products = [
    {
      name: "Headphones XAS-305>",
      brand: "Nisuta",
      stock: 2,
      price: "$185.02",
      img: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-gamer-gx-gaming-xg200-usb-black-g5-0.jpg",
    },
    {
      name: "Microphone XAS-305>",
      brand: "Noga",
      stock: 5,
      price: "$845.02",
      img: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-gamer-gx-gaming-xg200-usb-black-g5-0.jpg",
    },
    {
      name: "Headphones XAS-305>",
      brand: "Nisuta",
      stock: 2,
      price: "$185.02",
      img: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-gamer-gx-gaming-xg200-usb-black-g5-0.jpg",
    },
    {
      name: "Microphone XAS-305>",
      brand: "Noga",
      stock: 5,
      price: "$845.02",
      img: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-gamer-gx-gaming-xg200-usb-black-g5-0.jpg",
    },
    {
      name: "Headphones XAS-305>",
      brand: "Nisuta",
      stock: 2,
      price: "$185.02",
      img: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-gamer-gx-gaming-xg200-usb-black-g5-0.jpg",
    },
    {
      name: "Microphone XAS-305>",
      brand: "Noga",
      stock: 5,
      price: "$845.02",
      img: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-gamer-gx-gaming-xg200-usb-black-g5-0.jpg",
    },
    {
      name: "Headphones XAS-305>",
      brand: "Nisuta",
      stock: 2,
      price: "$185.02",
      img: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-gamer-gx-gaming-xg200-usb-black-g5-0.jpg",
    },
    {
      name: "Microphone XAS-305>",
      brand: "Noga",
      stock: 5,
      price: "$845.02",
      img: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-gamer-gx-gaming-xg200-usb-black-g5-0.jpg",
    },
    {
      name: "Headphones XAS-305>",
      brand: "Nisuta",
      stock: 2,
      price: "$185.02",
      img: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-gamer-gx-gaming-xg200-usb-black-g5-0.jpg",
    },
    {
      name: "Microphone XAS-305>",
      brand: "Noga",
      stock: 5,
      price: "$845.02",
      img: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-gamer-gx-gaming-xg200-usb-black-g5-0.jpg",
    },
    {
      name: "Headphones XAS-305>",
      brand: "Nisuta",
      stock: 2,
      price: "$185.02",
      img: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-gamer-gx-gaming-xg200-usb-black-g5-0.jpg",
    },
    {
      name: "Microphone XAS-305>",
      brand: "Noga",
      stock: 5,
      price: "$845.02",
      img: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-gamer-gx-gaming-xg200-usb-black-g5-0.jpg",
    },
  ];
  const user = [
    {
      name: "Ricardo Fort",
      profilePic: [
        "https://elcordillerano1.cdn.net.ar/252/elcordillerano/images/01/02/09/1020965_365fc4b732ec9f9283a8eddbadc8115e92650b2e92217715fe312e6fa7b90d82/sm.webp",
      ],
    },
  ];
  return (
    <div>
      <SideBar />
      <div className={C.headerCont}>
        <div className={C.btnCont}>
          <img src={add} alt="" />
          <Link to="/sell" style={{ textDecoration: "none" }}>
            <span>New product</span>
          </Link>
        </div>
        <div className={C.headerAdd}>
          <button
            className={active.A ? C.active : C.inactive}
            id={1}
            onClick={e => {
              setBtn(e);
            }}
          >
            For sale
          </button>
          <button
            className={active.B ? C.active : C.inactive}
            id={2}
            onClick={e => {
              setBtn(e);
            }}
          >
            Bought
          </button>
          <button
            className={active.C ? C.active : C.inactive}
            id={3}
            onClick={e => {
              setBtn(e);
            }}
          >
            My cart
          </button>
        </div>
      </div>

      <CardsCreated products={products} />
    </div>
  );
}
