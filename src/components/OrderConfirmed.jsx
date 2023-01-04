import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderStatus, clearCart, getUserCartItem } from "../redux/actions";

export default function OrderConfirmed() {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  dispatch(changeOrderStatus(user.id, "completed"));
  dispatch(clearCart(user.email));

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
  return <div>{successAlert()}</div>;
}
