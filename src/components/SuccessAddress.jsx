import React from "react";
import A from "../styles/AddressForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import AddressUpdate from "./AddressUpdate";
import { useState } from "react";
import { getAddresses } from "../redux/actions";
import { Link } from "react-router-dom";

export default function SuccessAddress({ handleReset }) {
  const addresses = useSelector(state => state.addresses);
  const user = useSelector(state => state.user);
  const [disable, setDisable] = useState(true);
  const [addressId, setAddressId] = useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAddresses(user.id));
  }, [dispatch]);

  return (
    <>
      <div className={A.container}>
        {disable === false && (
          <div className={A.updateForm}>
            <AddressUpdate addressId={addressId} />
          </div>
        )}
        {disable && (
          <div className={A.success}>
            <label onClick={() => handleReset()}>╳</label>
            <h4>Your addresses</h4>

            <div className={A.addressBox}>
              {addresses.length &&
                addresses.map((el, i) => (
                  <Link
                    style={{ textDecoration: "none", color: "#212121" }}
                    to={`/address/${user.id}/${addresses[i].id}`}
                    key={i}
                  >
                    <div className={A.addressContainer}>
                      {el.isDefault && <p className={A.default}>Default</p>}
                      <p value={i} className={A.addressText}>{` ${el.streetName
                        } n° ${el.streetNumber}, apartment ${el.apartment
                        }, Zip Code n° ${el.zipCode}. ${el.additionalDetails && el.additionalDetails
                        }, ${el[Object.keys(el)[Object.keys(el).length - 1]]
                        }, Argentina`}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className={A.background}></div>
    </>
  );
}
