import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAddress, getLocations } from "../redux/actions";
import O from "../styles/OrderForm.module.css";

export default function Addresses({ id }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAddress(id));
  }, [dispatch]);

  const address = useSelector(state => state.address);

  return (
    <div>
      {address.length > 0 && (
        <>
          <h2 className={O.yourAddress}>Your addresses</h2>
          <div className={O.addressBox}>
            <div className={O.addressContainer}>
              {address.length > 0 &&
                address.map((el, i) => (
                  <div className={O.address} key={i}>
                    <input type="radio" />
                    <span>{`Address n° ${i + 1}`}</span>
                    <p>{`${el.streetName} n° ${el.streetNumber}, apartment ${el.apartment}, Zip Code n° ${el.zipCode}. ${el.additionalDetails}`}</p>
                    <span className={O.default}>
                      {el.isDefault === true && `Default`}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
