import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAddress, updateAddress } from "../redux/actions";
import { capitalizeEachLetter } from "../utils/functions";
import S from "../styles/ProfileAddresses.module.css";

export default function ProfileAddresses() {
  const addresses = useSelector(state => state.addresses);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    dispatch(deleteAddress(e));
    alert("Address has been removed successfully");
  }

  const handleDefault = (e) => {
    const data = { id: e, isDefault: true };
    dispatch(updateAddress(data));
  }

  return (
    <div>
      {addresses.length ? (
        addresses.map((el, i) => (
          <div className={S.cardContainer} key={i}>
            <div className={S.container}>
              <div className={S.titleCont}>
                {el.isDefault && <span>Default</span>}
                <h4>{capitalizeEachLetter(el.streetName)} {el.streetNumber}{el.apartment && `, ${el.apartment.toUpperCase()}`}</h4>
                <h5>Zip Code: {el.zipCode.toUpperCase()}</h5>
                <h5>Location: {`${el.locationName}, Argentina`}</h5>
                <div className={S.details}>{el.additionalDetails && `Additional Details: ${capitalizeEachLetter(el.additionalDetails)}`}</div>
                <div className={S.setAsDefault}>
                  {!el.isDefault && <button onClick={e => handleDefault(el.id)}>Set as default</button>}
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
          <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
            <p>Choose your favorites!</p>
          </Link>
        </div>
      )}
    </div>
  );
}
