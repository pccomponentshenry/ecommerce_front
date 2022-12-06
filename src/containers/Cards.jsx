import React from "react";
import CardComponent from "../components/Card";
import C from "../styles/Cards.module.css";
import Pagination from "../components/Pagination";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, getFiltered } from "../redux/actions/index.js";
import { Link } from "react-router-dom";

export default function Cards(props) {
  const [itemsPerPage, setitemsPerPage] = useState(8);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(6);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [pageNumberLimit, setpageNumberLimit] = useState(6);
  const indexOfLastItem = props.currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let dispatch = useDispatch();
  let products = useSelector(state => state.products);
  let filtered = useSelector(state => state.filtered);
  let searchBar = useSelector(state => state.searchBar);

  const currentItems =
    filtered.length > 0
      ? Array.from(filtered).slice(indexOfFirstItem, indexOfLastItem)
      : searchBar.length > 0
      ? Array.from(searchBar).slice(indexOfFirstItem, indexOfLastItem)
      : products.length > 2
      ? Array.from(products).slice(indexOfFirstItem, indexOfLastItem)
      : products;
  const data =
    filtered.length > 0
      ? filtered.length
      : searchBar.length > 0
      ? searchBar.length
      : products.length;
  return (
    <div className={C.cardContainer}>
      {currentItems.length > 0 &&
        currentItems.map(el => (
          <Link
            to={`/${el.id}`}
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
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPage}
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
          name={props.name}
        />
      </div>
    </div>
  );
}
