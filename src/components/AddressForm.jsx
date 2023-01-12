import React from "react";
import A from "../styles/AddressForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getLocations, postAddress } from "../redux/actions";
import { useState, useEffect } from "react";

export default function AddressForm({ handleExit, handleShowAddresses }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const locations = useSelector(state => state.locations);
  const [error, setError] = useState({});
  const [disable, setDisable] = useState(true);
  const [input, setInput] = useState({
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

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
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
  };

  const handleSubmit = e => {
    if (
      !error.streetName &&
      !error.streetNumber &&
      !error.zipCode &&
      !error.location
    ) {
      dispatch(postAddress({ ...input, userId: user.id }));
      setDisable(true);
      handleShowAddresses();
    } else {
      alert("Something went wrong, try again!");
    }
  };

  return (
    <>
      <div className={A.container}>
        <div className={A.formContainer}>
          <label className={A.exitForm} onClick={handleExit}>
            ╳
          </label>
          <h4>Add a new address</h4>
          <form
            onSubmit={() => {
              handleSubmit();
              handleExit();
            }}
            autoComplete="off"
          >
            <div className={A.street}>
              <input
                type="text"
                name="streetName"
                value={input.streetName || ""}
                placeholder="Street name"
                onChange={e => handleChange(e)}
                onBlur={e => {
                  errorSetting(e);
                }}
              />
              {error.streetName && (
                <span className={A.errorName}>{error.streetName}</span>
              )}
            </div>
            <div className={A.number}>
              <input
                type="number"
                name="streetNumber"
                value={input.streetNumber || ""}
                placeholder="Street number"
                onChange={e => handleChange(e)}
                onBlur={e => errorSetting(e)}
              />
              {error.streetNumber && (
                <span className={A.errorNumber}>{error.streetNumber}</span>
              )}
            </div>
            <div className={A.apartment}>
              <input
                type="text"
                name="apartment"
                value={input.apartment || ""}
                placeholder="Apartment"
                onChange={e => handleChange(e)}
                onBlur={e => errorSetting(e)}
              />
              {error.apartment && (
                <span className={A.errorApartment}>{error.apartment}</span>
              )}
            </div>
            <div className={A.zipCode}>
              <input
                type="zipCode"
                name="zipCode"
                value={input.zipCode || ""}
                placeholder="Zip Code"
                onChange={e => handleChange(e)}
                onBlur={e => errorSetting(e)}
              />
              {error.zipCode && (
                <span className={A.errorZipCode}>{error.zipCode}</span>
              )}
            </div>
            <div className={A.location}>
              <select
                name="location"
                id="location"
                onChange={e => handleChange(e)}
                onBlur={e => errorSetting(e)}
              >
                <option defaultValue={"DEFAULT"}>Location</option>
                {locations.map((el, i) => (
                  <option key={i} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>

              {error.location && (
                <span className={A.errorLocation}>{error.location}</span>
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
              className={disable ? A.disabled : A.enabled}
            >
              Submit address
            </button>{" "}
          </form>
        </div>
      </div>

      <div className={A.background}></div>
    </>
  );
}
