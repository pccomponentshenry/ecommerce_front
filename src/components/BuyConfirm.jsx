import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Sell() {
  const successAlert = () => {
    const navigate = useNavigate();
    Swal.fire({
      title: "Successful Purchase!",
      confirmButtonText: "Les't buy more products",
      showDenyButton: true,
      denyButtonText: `Post a Review`,
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
        navigate("/addreview");
      }
    });
  };
  return <div>{successAlert()}</div>;
}
