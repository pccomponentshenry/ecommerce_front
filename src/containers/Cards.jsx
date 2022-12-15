import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CardComponent from "../components/Card";
import ReactPaginate from "react-paginate";
import { setFiltered, addToCartAction } from "../redux/actions/index.js";
import C from "../styles/Cards.module.css";
import NoProducts from "../alerts/NoProducts";

export default function Cards(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const filtered = useSelector(state => state.filtered);
  const error = useSelector(state => state.error);

  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filtered.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % filtered.length;
    setItemOffset(newOffset);
  };

  const addToCart = product => {
    dispatch(addToCartAction(product));
    successAlert();
  };

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

  useEffect(() => {
    dispatch(setFiltered(products));
  }, [dispatch]);

  useEffect(() => {
    setItemOffset(0);
  }, [filtered])

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
                addToCart={addToCart}
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
