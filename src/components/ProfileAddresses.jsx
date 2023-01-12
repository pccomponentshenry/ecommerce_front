import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteAddress, updateAddress } from "../redux/actions";
import { capitalizeEachLetter } from "../utils/functions";
import S from "../styles/ProfileAddresses.module.css";

export default function ProfileAddresses() {
  const addresses = useSelector(state => state.addresses);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleDelete = e => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      confirmButtonColor: "rgb(55, 172, 135)",
      denyButtonColor: "#d83dd0",
      background: "#272727",
      color: "#fff",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteAddress(e));
      }
    });
  };

  const handleDefault = e => {
    const data = { id: e, isDefault: true };
    dispatch(updateAddress(data));
  };

  return (
    <div>
      {addresses.length ? (
        addresses.map((el, i) => (
          <div className={S.cardContainer} key={i}>
            <div className={S.container}>
              <div className={S.titleCont}>
                {el.isDefault && <span>Default</span>}
                <h4>
                  {capitalizeEachLetter(el.streetName)} {el.streetNumber}
                  {el.apartment && `, ${el.apartment.toUpperCase()}`}
                </h4>
                <h6>Zip Code: {el.zipCode.toUpperCase()}</h6>
                <h6>Location: {`${el.locationName}, Argentina`}</h6>
                <div className={S.details}>
                  {el.additionalDetails &&
                    `Additional Details: ${capitalizeEachLetter(
                      el.additionalDetails
                    )}`}
                </div>
                <div className={S.setAsDefault}>
                  {!el.isDefault && (
                    <button onClick={e => handleDefault(el.id)}>
                      Set as default
                    </button>
                  )}
                </div>

                <div className={S.btnContainer}>
                  <Link to={`/address/${user.id}/${el.id}`}>
                    <button>Update</button>
                  </Link>
                  <button onClick={e => handleDelete(el.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={S.noAddresses}>
          <h5>You don't have any addresses yet!</h5>
          <p style={{ textDecoration: "none", color: "gray" }}>
            Add one to your profile to see it here
          </p>
        </div>
      )}
    </div>
  );
}
