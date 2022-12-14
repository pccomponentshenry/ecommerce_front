import React from "react";
import CardComponent from "../components/Card";
import C from "../styles/Cards.module.css";
import Pagination from "../components/Pagination";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiltered, addToCartAction } from "../redux/actions/index.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import NoProducts from "../alerts/NoProducts";

export default function Cards(props) {
  const [itemsPerPage, setitemsPerPage] = useState(9);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(6);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [pageNumberLimit, setpageNumberLimit] = useState(6);
  const indexOfLastItem = props.currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const navigate = useNavigate();

  let dispatch = useDispatch();
  let products = useSelector(state => state.products);
  let filtered = useSelector(state => state.filtered);
  let searchBar = useSelector(state => state.searchBar);
  let error = useSelector(state => state.error);

  React.useEffect(() => {
    dispatch(getFiltered(products));
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getFiltered(filtered));
  }, [dispatch]);

  const currentItems =
    filtered.length > 0
      ? Array.from(filtered).slice(indexOfFirstItem, indexOfLastItem)
      : Array.from(searchBar).slice(indexOfFirstItem, indexOfLastItem);

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
  const data =
    filtered.length > 0
      ? filtered.length
      : searchBar.length > 0
      ? searchBar.length
      : products.length;
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
              // </Link>
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
