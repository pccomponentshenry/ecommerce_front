import React from "react";
import CardComponent from "../components/Card";
import C from "../styles/Cards.module.css";
import Pagination from "../components/Pagination";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Cards() {
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
      name: "Keyboard Sarasa 320",
      brand: "Noga",
      stock: 5,
      price: "$845.02",
      img: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mouse-gamer-gx-gaming-xg200-usb-black-g5-0.jpg",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(8);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(6);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [pageNumberLimit, setpageNumberLimit] = useState(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    products.length > 2
      ? products.slice(indexOfFirstItem, indexOfLastItem)
      : products;
  const data = products.length;
  return (
    <div className={C.cardContainer}>
      {currentItems.length > 0 &&
        currentItems.map((el, i) => (
          <Link
            to="/detail/1"
            style={{ textDecoration: "none", color: "white" }}
          >
            <CardComponent
              products={products}
              key={i}
              img={el.img}
              name={el.name}
              price={el.price}
              brand={el.brand}
            />
          </Link>
        ))}
      <div className={C.pagination}>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setitemsPerPage={setitemsPerPage}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          currentItems={currentItems}
          data={data}
          products={products}
          minPageNumberLimit={minPageNumberLimit}
          setminPageNumberLimit={setminPageNumberLimit}
          maxPageNumberLimit={maxPageNumberLimit}
          setmaxPageNumberLimit={setmaxPageNumberLimit}
          pageNumberLimit={pageNumberLimit}
          setpageNumberLimit={setpageNumberLimit}
        />
      </div>
    </div>
  );
}
