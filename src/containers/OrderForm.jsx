import React from "react";
import O from "../styles/OrderForm.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function OrderForm() {
  const [input, setInput] = useState({
    streetName: "",
    streetNumber: "",
    apartment: "",
    zipCode: "",
    location: "",
    aditionalInformation: "",
  });
  const [error, setError] = useState();
  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

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
    if (!input.location) {
      errors.location = "*Location is required";
    }
  };

  const cart = useSelector(state => state.cart);
  const address = [
    {
      streetName: "Fake avenue",
      streetNumber: 12,
      apartment: "6A",
      zipCode: 7600,
      additionalDetailes: "Red front door",
      isDefault: true,
      location: {
        name: "Santa Cruz",
      },
    },
    {
      streetName: "Fake street",
      streetNumber: 8,
      apartment: "3A",
      zipCode: 1900,
      additionalDetailes: "Blue front door",
      isDefault: false,
      location: {
        name: "Córdoba",
      },
    },
    {
      streetName: "Fake street 2",
      streetNumber: 64,
      apartment: "2B",
      zipCode: 7105,
      additionalDetailes: "Brown front door",
      isDefault: false,
      location: {
        name: "Buenos Aires",
      },
    },
  ];
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
      </div>

      {address.length && (
        <>
          <h2 className={O.yourAddress}>Your addresses</h2>
          <div className={O.addressBox}>
            <div className={O.addressContainer}>
              {address.map((el, i) => (
                <div className={O.address} key={i}>
                  <input type="radio" />
                  <span>{`Address n° ${i + 1}`}</span>
                  <p>{`${el.streetName} n° ${el.streetNumber}, ${el.location.name}, apartment ${el.apartment}, Zip Code n° ${el.zipCode}. ${el.additionalDetailes}`}</p>
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
        <h1>Add a new address</h1>
        <div className={O.formContainer}>
          <form>
            <input
              type="text"
              name="streetName"
              value={input.streetName || ""}
              placeholder="Street name"
              onChange={e => handleChange(e)}
              onBlur={e => errorSetting(e)}
            />
            <input
              type="number"
              name="streetNumber"
              value={input.streetNumber || ""}
              placeholder="Street number"
              onChange={e => handleChange(e)}
              onBlur={e => errorSetting(e)}
            />
            <input
              type="text"
              name="apartment"
              value={input.apartment || ""}
              placeholder="Apartment"
              onChange={e => handleChange(e)}
              onBlur={e => errorSetting(e)}
            />
            <input
              type="zipCode"
              name="zipCode"
              value={input.zipCode || ""}
              placeholder="Zip Code"
              onChange={e => handleChange(e)}
              onBlur={e => errorSetting(e)}
            />
            <select name="location" id="location">
              <option value="">Location</option>
            </select>
            <textarea
              name="additionalInformation"
              value={input.aditionalInformation || ""}
              id=""
              cols="30"
              rows="10"
              placeholder="Additional information"
              onChange={e => handleChange(e)}
              onBlur={e => errorSetting(e)}
            />
            <button type="submit">Submit address</button>
          </form>
        </div>
      </div>
    </div>
  );
}
