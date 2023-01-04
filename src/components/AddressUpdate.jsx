import React from "react";
import A from "../styles/AddressUpdate.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getAddressById, getLocations, updateAddress } from "../redux/actions";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AddressUpdate() {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const address = useSelector(state => state.address);
  const locations = useSelector(state => state.locations);
  const [error, setError] = useState({});
  const [disable, setDisable] = useState(true);
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    id: "",
    streetName: "",
    streetNumber: "",
    apartment: "",
    zipCode: "",
    locationId: "",
    additionalDetails: "",
    isDefault: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAddressById(params.id, params.userId));
  }, [dispatch]);

  const handleChange = e => {
    if (e.target.id === "locationId") {
      setInput({
        ...input,
        locationId: Number(e.target.value),
        id: user.id,
      });
    } else {
      setInput({ ...input, [e.target.name]: e.target.value, id: params.id });
    }
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
    if (!input.locationId) {
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

  const handleSubmit = e => {
    e.preventDefault();
    if (
      !error.streetName &&
      !error.streetNumber &&
      !error.zipCode &&
      !error.location
    ) {
      dispatch(updateAddress(input));
      setDisable(true);
      setSuccess(true);
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } else {
      alert("Something went wrong, try again!");
    }
  };

  return (
    <>
      <div className={A.container}>
        {success === true && (
          <div className={A.message}>
            <h1>Address successfully updated</h1>
            <p>Redirecting to profile in a few seconds</p>
            <div className={A.imgCont}>
              <img
                src="https://res.cloudinary.com/dbtekd33p/image/upload/v1672546152/cqws5x8n/APS_28_y4jd82.jpg"
                alt=""
              />
            </div>
          </div>
        )}
        {success === false && (
          <div className={A.formContainer}>
            <label
              className={A.exit}
              onClick={() => {
                navigate("/profile");
              }}
            >
              ╳
            </label>
            <h4>Edit your address</h4>
            <p className={A.oldAddress}>{` ${address.streetName} n° ${address.streetNumber
              }, apartment ${address.apartment}, Zip Code n° ${address.zipCode
              }. ${address.additionalDetails && address.additionalDetails}, ${address[Object.keys(address)[Object.keys(address).length - 1]]
              }, Argentina`}</p>

            <form onSubmit={handleSubmit} autoComplete="off">
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
              <div className={A.defaultInput}>
                <input
                  id="default"
                  type="checkbox"
                  onClick={() =>
                    setInput({ ...input, isDefault: !input.isDefault })
                  }
                />
                <label htmlFor="default">Set as default address</label>
              </div>
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
        )}
      </div>
    </>
  );
}
