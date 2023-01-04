import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, getProductsByUser } from "../redux/actions";
import S from "../styles/ForSale.module.css";

export default function ForSale() {

  const productsForSale = useSelector(state => state.productsForSale);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getProductsByUser(user.id));
    setIsLoading(false);
  }, [user])

  function handleDelete(e) {
    dispatch(deleteProduct(e));
    alert("Product has been removed successfully");
  }

  return (
    <div>
      {isLoading ? <div>Loading...</div> : productsForSale.length > 0 ? (
        productsForSale.map((el, i) => (
          <div className={S.cardContainer} key={i}>
            <div className={S.container}>
              <div className={S.imgCont}>
                <img src={el.img} alt="" />
              </div>

              <div className={S.titleCont}>
                <span>{el.category.name}</span>
                <h4>{el.title}</h4>
                <h5>{el.brand.name}</h5>
                <p>${el.price}</p>
                <div className={S.stockAndStatus}>
                  <label>Stock: {el.stock}</label>
                  <label>{el.status}</label>
                </div>
                <div className={S.btnContainer}>
                  <Link to={"/update/" + el.id}>
                    <button>Update</button>
                  </Link>
                  <button onClick={e => handleDelete(el.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={S.noProductsCont}>
          <h5>You don't have any products for sale yet</h5>
          <Link to="/sell" style={{ textDecoration: "none", color: "#fff" }}>
            <span>Publish now!</span>{" "}
          </Link>
        </div>
      )}
    </div>
  );
}
