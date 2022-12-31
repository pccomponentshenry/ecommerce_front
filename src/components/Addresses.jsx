import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAddresses } from "../redux/actions";
import O from "../styles/OrderForm.module.css";

export default function Addresses({ id }) {
  const dispatch = useDispatch();
  const addresses = useSelector(state => state.addresses);

  React.useEffect(() => {
    dispatch(getAddresses(id));
  }, [dispatch]);

  return (
    <div>
      {addresses.length && (
        <>
          <h2 className={O.yourAddress}>Your addresses</h2>
          <div className={O.addressBox}>
            <div className={O.addressContainer}>
              {addresses.length &&
                addresses.map((el, i) => (
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
