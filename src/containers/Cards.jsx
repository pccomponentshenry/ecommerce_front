import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import CardComponent from "../components/Card";

import { postCartItem, setFiltered } from "../redux/actions/index.js";

import C from "../styles/Cards.module.css";
import NoProducts from "../alerts/NoProducts";

export default function Cards() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const filtered = useSelector(state => state.filtered);

  const error = useSelector(state => state.error);

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  let currentItems = filtered.slice(itemOffset, endOffset);
  currentItems = currentItems.filter(
    el => el.status === "active" && el.stock > 0
  );

  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % filtered.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setItemOffset(0);
  }, [filtered]);

  return (
    <>
      <div className={C.cardContainer}>
        {!error.length ? (
          currentItems.length === 0 ? (
            <NoProducts />
          ) : (
            <>
              {currentItems.map(el => (
                <CardComponent
                  key={el.id}
                  img={el.img}
                  title={el.title.substr(0, 18) + "..."}
                  price={el.price}
                  brand={el.brand.name ? el.brand.name : el.brand}
                  id={el.id}
                  product={el}
                  quantity={el.quantity}
                />
              ))}
            </>
          )
        ) : (
          <div>
            <NoProducts />
          </div>
        )}
      </div>
      <div className={C.pagination}>
        <ReactPaginate
          className={C.paginate}
          activeClassName={C.active}
          previousClassName={C.previousNext}
          previousLinkClassName={C.previous}
          nextClassName={C.previousNext}
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={4}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}
