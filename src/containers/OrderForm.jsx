import React from "react";
import O from "../styles/OrderForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getLocations, postAddress, getAddress } from "../redux/actions";
import { useEffect } from "react";
import Payment from "../stripe/Payment";

export default function OrderForm() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);
  const address = useSelector(state => state.address);
  const user = useSelector(state => state.user);
  const defaultAdress = address.find(el => el.isDefault === true);
  const [order, setOrder] = useState({
    address: defaultAdress,
  }); /// Acá recolecta cart, userId y la dirección seleccionada
  const [click, setClick] = useState(false);

  React.useEffect(() => {
    dispatch(getAddress(user.id));
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getAddress(user.id));
  }, [click]);

  const initialState = {
    streetName: "",
    streetNumber: "",
    apartment: "",
    zipCode: "",
    locationId: "",
    additionalDetails: "",
  };

  const [input, setInput] = useState({
    userId: "",
    streetName: "",
    streetNumber: "",
    apartment: "",
    zipCode: "",
    locationId: "",
    additionalDetails: "",
  });

  const [error, setError] = useState({});
  const [disable, setDisable] = useState(true);

  const handleChange = e => {
    if (e.target.id === "locationId") {
      setInput({
        ...input,
        locationId: Number(e.target.value),
        userId: user.id,
      });
    } else {
      setInput({ ...input, [e.target.name]: e.target.value, userId: user.id });
    }
  };
  const locations = useSelector(state => state.locations);
  const errorSetting = e => {
    setError(
      handleValidate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleValidate = input => {
    const errors = {};
    const regexNumber = /^[0-9]+$/;
    if (!input.streetName) {
      errors.streetName = "*Street name is required";
    }
    if (!input.streetNumber) {
      errors.streetNumber = "*Street number is required";
    } else if (!regexNumber.test(input.streetNumber)) {
      errors.streetNumber = "*Street number must be an integer number";
    }
    if (!input.apartment) {
      errors.apartment = "*Apartment is required";
    }
    if (!input.zipCode) {
      errors.zipCode = "*Zip code is required";
    }
    if (!input.locationId) {
      errors.location = "*Location is required";
    }
    if (
      !error.streetName &&
      !error.streetNumber &&
      !error.apartment &&
      !error.location &&
      !error.zipCode &&
      !error.location
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }

    return errors;
  };

  const cart = useSelector(state => state.cart);

  const clearForm = () => {
    setInput({ ...initialState });
  };

  const handleSubmit = e => {
    if (
      !error.streetName &&
      !error.streetNumber &&
      !error.zipCode &&
      !error.location &&
      !error.apartment
    ) {
      e.preventDefault();
      console.log(input);
      dispatch(postAddress(input));
      setDisable(true);
      clearForm();
      dispatch(getAddress(user.id));
    } else {
      alert("Something went wrong, try again!");
    }
    setClick(!click);
    dispatch(getAddress(user.id));
  };

  const handleOrder = e => {
    setOrder({
      ...order,
      userId: user.id,
      cart: cart,
      address: address[e.target.value],
    });
  };

  return (
    <div className={O.container}>
      <div className={O.darkNav}></div>
      <div className={O.cartContainer}>
        <h1>Shopping cart</h1>
        {cart.map((el, i) => (
          <div key={i} className={O.cartItem}>
            <div className={O.imgContainer}>
              <img src={el.img} alt="" />
            </div>
            <h4>{el.title}</h4>
            <h5>Quantity: {el.quantity} unit</h5>
            <h6>Total: ${el.price}</h6>
          </div>
        ))}
        <div className={O.payment}>
          <Payment />
        </div>
      </div>

      {address.length > 0 && (
        <>
          <h2 className={O.yourAddress}>Your addresses</h2>
          <div className={O.addressBox}>
            <div className={O.addressContainer}>
              {address.length > 0 &&
                address.map((el, i) => (
                  <div className={O.address} key={i}>
                    <input
                      defaultChecked={el.isDefault === true ? "checked" : null}
                      type="radio"
                      name="address"
                      value={i}
                      onClick={e => handleOrder(e)}
                    />
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

      <div className={O.newAddressCont}>
        <h1>Add a new address</h1>{" "}
        {address.length === 0 && (
          <span
            className={O.getAddress}
            onClick={() => dispatch(getAddress(user.id))}
          >
            ⚠ Already have an address? Click here
          </span>
        )}
        <div className={O.formContainer}>
          <form onSubmit={e => handleSubmit(e)} autoComplete="off">
            <div className={O.street}>
              <input
                type="text"
                name="streetName"
                value={input.streetName || ""}
                placeholder="Street name"
                onChange={e => handleChange(e)}
                onBlur={e => {
                  errorSetting(e);
                  console.log(error);
                }}
              />
            </div>
            {error.streetName && (
              <span className={O.errorName}>{error.streetName}</span>
            )}
            <div className={O.number}>
              <input
                type="number"
                name="streetNumber"
                value={input.streetNumber || ""}
                placeholder="Street number"
                onChange={e => handleChange(e)}
                onBlur={e => errorSetting(e)}
              />
            </div>
            {error.streetNumber && (
              <span className={O.errorNumber}>{error.streetNumber}</span>
            )}
            <div className={O.apartment}>
              <input
                type="text"
                name="apartment"
                value={input.apartment || ""}
                placeholder="Apartment"
                onChange={e => handleChange(e)}
                onBlur={e => errorSetting(e)}
              />
              {error.apartment && (
                <span className={O.errorApartment}>{error.apartment}</span>
              )}
            </div>
            <div className={O.zipCode}>
              <input
                type="zipCode"
                name="zipCode"
                value={input.zipCode || ""}
                placeholder="Zip Code"
                onChange={e => handleChange(e)}
                onBlur={e => errorSetting(e)}
              />
            </div>
            {error.zipCode && (
              <span className={O.errorZipCode}>{error.zipCode}</span>
            )}
            <div className={O.location}>
              <select
                name="locationId"
                id="locationId"
                onChange={e => handleChange(e)}
                onBlur={e => errorSetting(e)}
              >
                <option defaultValue={"DEFAULT"}>Location</option>
                {locations.map((el, i) => (
                  <option key={i} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>

              {error.location && (
                <span className={O.errorLocation}>{error.location}</span>
              )}
            </div>
            <textarea
              name="additionalDetails"
              value={input.additionalInformation}
              id="information"
              cols="30"
              rows="10"
              placeholder="Additional information"
              onChange={e => handleChange(e)}
              onBlur={e => errorSetting(e)}
            />
            <button
              type="submit"
              onClick={e => {
                disable && e.preventDefault();
              }}
              className={disable ? O.disabled : O.enabled}
            >
              Submit address
            </button>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}
