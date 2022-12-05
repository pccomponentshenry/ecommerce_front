import React from "react";
import CardComponent from "../components/Card";
import C from "../styles/Cards.module.css";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allProducts } from "../redux/actions/index.js"
import { Link } from "react-router-dom";


export default function Cards() {
 

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(8);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(6);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [pageNumberLimit, setpageNumberLimit] = useState(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let dispatch = useDispatch()
  let products = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(allProducts())
       },[dispatch])

  const currentItems =
  products.length > 2
      ? Array.from(products).slice(indexOfFirstItem, indexOfLastItem)
      : products;
  const data = products.length;
  return (
    <div className={C.cardContainer}>
      {currentItems.length > 0 &&
        currentItems.map((el) => (
          <Link
            to="/detail/1"
            style={{ textDecoration: "none", color: "white" }}
          >
            <CardComponent
             
              key={el.id}
              img={el.img}
              title={el.title}
              price={el.price}
              brand={el.brand.name}
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
