import React from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function OrderConfirmed() {

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { user } = useAuth0();

  const order = () => {
    dispatch(createOrder(cart, user.email));
    dispatch(clearCart(user.email));
  }

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
      } else if (result.isDenied) {
        navigate("/profile");
      }
    });
  };
  return <div>{successAlert()}</div>;
}
