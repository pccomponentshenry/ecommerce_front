import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeOrderStatus, getLocations, postAddress } from "../redux/actions";
import { capitalizeEachLetter } from "../utils/functions";
import Payment from "../stripe/Payment";
import O from "../styles/OrderForm.module.css";

export default function OrderForm() {
  const dispatch = useDispatch();
  const addresses = useSelector(state => state.addresses);
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const locations = useSelector(state => state.locations);
  const fromStripe = useSelector(state => state.fromStripe);
  const [checkoutEnable, setCheckoutEnable] = useState(false);

  const [error, setError] = useState({});
  const [disable, setDisable] = useState(true);
  const [address, setAddress] = useState();
  const [input, setInput] = useState({
    userId: "",
    streetName: "",
    streetNumber: "",
    apartment: "",
    zipCode: "",
    location: "",
    additionalDetails: "",
  });

  const initialState = {
    streetName: "",
    streetNumber: "",
    apartment: "",
    zipCode: "",
    location: "",
    additionalDetails: "",
  };

  if (fromStripe) {
    dispatch(changeOrderStatus(user.id, "cancelled"));
  }

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length) {
      setAddress(addresses.find(a => a.isDefault).id);
    }
  }, [addresses]);

  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value, userId: user.id });
  };

  const errorSetting = e => {
    setError(handleValidate({ ...input, [e.target.name]: e.target.value }));
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
    if (!input.zipCode) {
      errors.zipCode = "*Zip code is required";
    }
    if (!input.location) {
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

  const clearForm = () => {
    setInput({ ...initialState });
    document.querySelectorAll("select")[0].selectedIndex = 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      !error.streetName &&
      !error.streetNumber &&
      !error.zipCode &&
      !error.location &&
      !error.apartment
    ) {
      dispatch(postAddress(input));
      setDisable(true);
      clearForm();
    } else {
      alert("Something went wrong, try again!");
    }
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
            <span>Quantity: {el.quantity} unit</span>
            <h6>Total: ${el.price}</h6>
          </div>
        ))}
        <h3 className={O.total}>
          Cart Total: $
          {parseFloat(
            cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
          ).toFixed(2)}
        </h3>
        {
          <div className={O.payment}>
            <Payment addressId={address} />
          </div>
        }
      </div>

      {addresses.length > 0 ? (
        <>
          <h2 className={O.yourAddress}>Select your shipping address:</h2>
          <div className={O.addressBox}>
            <div className={O.addressContainer}>
              {addresses.map((el, i) => (
                <div className={O.address} key={i}>
                  <input
                    defaultChecked={el.isDefault ? "checked" : null}
                    type="radio"
                    name="address"
                    value={el.id}
                    onClick={() => setAddress(el.id)}
                  />
                  <span>{`Address N° ${i + 1}`}</span>
                  <p>
                    {capitalizeEachLetter(el.streetName)} {el.streetNumber}
                    {el.apartment && `, ${el.apartment.toUpperCase()}`}
                  </p>
                  <p>Zip Code: {el.zipCode.toUpperCase()}</p>
                  <p>{`${el.locationName}, Argentina`}</p>
                  <span className={O.default}>
                    {el.isDefault === true && `Default`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className={O.noAddresses}>
            <div className={O.headerText}>
              <h3>No more waiting</h3>
              <h1>Same-Day Shipping & Delivery</h1>
            </div>
            <img
              src="https://res.cloudinary.com/dbtekd33p/image/upload/v1672512330/cqws5x8n/blog-tw-Shipping-2_2x_t4qeom.webp"
              alt=""
            />
          </div>
          <h4 className={O.addText}>
            Please add a shipping address below to continue with your purchase
          </h4>
        </div>
      )}

      <div className={O.newAddressCont}>
        <h1>Add a new address</h1>{" "}
        {/* {addresses.length === 0 && (
          <span
            className={O.getAddress}
            onClick={() => dispatch(getAddress(user.id))}
          >
            ⚠ Already have an address? Click here
          </span>
        )} */}
        <div className={O.formContainer}>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className={O.street}>
              <input
                type="text"
                name="streetName"
                value={input.streetName || ""}
                placeholder="Street name"
                onChange={e => {
                  handleChange(e);
                  errorSetting(e);
                }}
                onBlur={e => {
                  errorSetting(e);
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
                onChange={e => {
                  handleChange(e);
                  errorSetting(e);
                }}
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
                onChange={e => {
                  handleChange(e);
                  errorSetting(e);
                }}
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
                onChange={e => {
                  handleChange(e);
                  errorSetting(e);
                }}
                onBlur={e => errorSetting(e)}
              />
            </div>
            {error.zipCode && (
              <span className={O.errorZipCode}>{error.zipCode}</span>
            )}
            <div className={O.location}>
              <select
                className={O.formContainerSelect}
                name="location"
                id="location"
                onChange={e => {
                  handleChange(e);
                  errorSetting(e);
                }}
                onBlur={e => errorSetting(e)}
                defaultValue="default"
              >
                <option className={O.defaultLocation} value="default" disabled>
                  {" "}
                  Location{" "}
                </option>
                {locations.map((el, i) => (
                  <option key={i} value={el.name}>
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
              onChange={e => {
                handleChange(e);
                errorSetting(e);
              }}
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
