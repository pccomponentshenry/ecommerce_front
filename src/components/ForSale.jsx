import React from "react";
import S from "../styles/ForSale.module.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { deleteProduct } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function ForSale() {
  const products = useSelector(state => state.products);
  const { user } = useAuth0();
  const dispatch = useDispatch();

  const myProducts = products.filter(p => p.creator === user.nickname);

  function handleDelete(e) {
    dispatch(deleteProduct(e));
    alert("Product has been removed successfully");
  }

  return (
    <div>
      {myProducts.length > 0 ? (
        myProducts.map((el, i) => (
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
