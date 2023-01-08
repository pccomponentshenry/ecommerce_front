import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { changeProductStatus, getProductsByUser } from "../redux/actions";
import S from "../styles/ForSale.module.css";

export default function ForSale() {
  const productsForSale = useSelector(state => state.productsForSale);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getProductsByUser(user.id));
    setIsLoading(false);
  }, [user]);

  function changeStatus(id, status) {
    if (status === "deleted") {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        confirmButtonColor: "rgb(55, 172, 135)",
        denyButtonColor: "#d83dd0",
        background: "#272727",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(changeProductStatus({ id, status }));
        }
      })
    }
    else {
      dispatch(changeProductStatus({ id, status }));
    }
  }
  return (
    <div className={S.forSale}>
      {isLoading ? (
        <div>Loading...</div>
      ) : productsForSale.length > 0 ? (
        productsForSale.map((el, i) => (
          <div className={S.cardContainer} key={i}>
            <div className={el.status === "deleted" ? S.productDeleted + " " + S.container : S.container}>
              <div className={S.infoContainer}>
                <div className={el.status === "deleted" ? S.productDeleted + " " + S.imgCont : S.imgCont}>
                  <img src={el.img} alt="" />
                </div>

                <div className={S.titleCont}>
                  <div className={S.catAndBrand}>
                    <span className={el.status === "deleted" ? S.spanDeleted : null}>{el.category.name}</span>
                    <h5 className={el.status === "deleted" ? S.h5Deleted : null}>Brand: {el.brand.name}</h5>
                  </div>

                  <h4 className={el.productTitle}>
                    {el.title.length < 60
                      ? el.title
                      : el.title.substr(0, 60) + "..."}
                  </h4>

                  <h6>
                    {el.description.length < 100
                      ? el.description
                      : el.description.substr(0, 200) + "..."}
                  </h6>

                  {el.status !== "deleted" && <div className={S.btnContainer}>
                    <Link to={"/update/" + el.id}>
                      <button>Update</button>
                    </Link>
                    <button onClick={e => changeStatus(el.id, el.status === "inactive" ? "active" : "inactive")}>{el.status === "active" ? "Pause" : el.status === "inactive" && "Activate"}</button>
                    <button onClick={e => changeStatus(el.id, "deleted")}>Delete</button>
                  </div>
                  }

                  <div className={S.stockAndStatus}>
                    <div className={S.stock}>
                      <label className={S.number}>
                        {el.status === "active" ? el.stock : el.status}
                      </label>
                      <p className={S.units}>
                        {el.stock === 1 ? "Unit" : "Units"}
                      </p>
                    </div>
                    <div className={S.price}>
                      <p>Price: ${el.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={S.noProductsCont}>
          <h5>You don't have any products for sale yet</h5>
          <Link to="/sell" style={{ textDecoration: "none", color: "gray" }}>
            <span>Publish now!</span>{" "}
          </Link>
        </div>
      )}
    </div>
  );
}
