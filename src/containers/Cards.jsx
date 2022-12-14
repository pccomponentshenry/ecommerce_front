import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CardComponent from "../components/Card";
import Pagination from "../components/Pagination";
import { setFiltered, addToCartAction } from "../redux/actions/index.js";
import C from "../styles/Cards.module.css";
import NoProducts from "../alerts/NoProducts";

export default function Cards(props) {

  const [itemsPerPage, setitemsPerPage] = useState(9);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(6);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [pageNumberLimit, setpageNumberLimit] = useState(6);
  const indexOfLastItem = props.currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const filtered = useSelector(state => state.filtered);
  const error = useSelector(state => state.error);

  useEffect(() => {
    dispatch(setFiltered(products));
  }, [dispatch]);

  const currentItems = Array.from(filtered).slice(indexOfFirstItem, indexOfLastItem);
  const data = filtered.length > 0 ? filtered.length : products.length;

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
