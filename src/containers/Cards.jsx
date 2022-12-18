import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import CardComponent from "../components/Card";
import { setFiltered, postCartItem, removeFromCart } from "../redux/actions/index.js";
import C from "../styles/Cards.module.css";
import NoProducts from "../alerts/NoProducts";
import { useAuth0 } from "@auth0/auth0-react";

export default function Cards() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const filtered = useSelector(state => state.filtered);
  const error = useSelector(state => state.error);
  const cartLS = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  //const cartLS = localStorage.getItem("cart")
  
  const { isAuthenticated } = useAuth0();

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filtered.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filtered.length / itemsPerPage);
  if (cartLS.length !== 0 && isAuthenticated){
    console.log(cartLS.length)
    for (let i = 0; i < cartLS.length; i++) {
      
      dispatch(postCartItem(cartLS[i]))
      
    }
    localStorage.setItem("cart", [])
    //falta hacer esta logica, pero ya limpie el LS
    //debo hacer una action PUT que trabaje con el back y db
   /*  for (let i = 0; i < cartLS.length; i++) {
      dispatch(removeFromCart(cartLS[i]))
    } */
    
  }

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % filtered.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(setFiltered(products));
  }, [dispatch]);

  useEffect(() => {
    setItemOffset(0);
  }, [filtered]);

  return (
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
                brand={el.brand.name}
                id={el.id}
                product={el}
                quantity={el.quantity}
              />
            ))}
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
        )
      ) : (
        <div>
          <NoProducts />
        </div>
      )}
    </div>
  );
}
