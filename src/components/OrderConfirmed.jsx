import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { changeOrderStatus, clearCart, getUserCartItem, updateProductsStock } from "../redux/actions";

export default function OrderConfirmed() {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const shouldUpdate = useRef(true);

  const updateDataBase = () => {
    dispatch(updateProductsStock(user.id));
    dispatch(changeOrderStatus(user.id, "completed"));
    dispatch(clearCart(user.email));
  }

  useEffect(() => {
    if (shouldUpdate.current && user.id) {
      shouldUpdate.current = false;
      updateDataBase();
    }
  }, [user]);

  const successAlert = () => {
    const navigate = useNavigate();

    Swal.fire({
      title: "Successful Purchase!",
      confirmButtonText: "Home",
      showDenyButton: true,
      denyButtonText: "My Profile",
      icon: "success",
      confirmButtonColor: "rgb(55, 172, 135)",
      denyButtonColor: "#d83dd0",
      background: "#272727",
      color: "#fff",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate("/");
        dispatch(getUserCartItem());
      } else if (result.isDenied) {
        navigate("/profile");
      }
    });
  };
  return (
    <div>{successAlert()}</div>
  );
}
