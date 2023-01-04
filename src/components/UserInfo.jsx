import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import U from "../styles/UserInfo.module.css";
import { useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import SuccessAddress from "./SuccessAddress";

export default function UserInfo({
  form,
  handleExit,
  handleOpen,
  addresses,
  handleShowAddresses,
  handleReset,
}) {
  const { isLoading, user } = useAuth0();
  const allAddresses = useSelector(state => state.addresses);
  const isDefault = allAddresses.find(el => el.isDefault === true);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {form && (
        <AddressForm
          handleExit={handleExit}
          handleShowAddresses={handleShowAddresses}
        />
      )}
      <div className={U.container}>
        <div className={U.authContainer}>
          <div className={U.imgContainer}>
            <img src={user.picture} alt={user.name} />
          </div>
          <div className={U.nameContainer}>
            <h3 className={U.name}>{user.name}</h3>
            <h3 className={U.email}>{user.email}</h3>
          </div>
          <hr className={U.profileLine} />
        </div>

        <div className={U.postalAdressContainer}>
          <h3 className={U.title}>Default postal address</h3>

          <div className={U.adressCont}>
            {allAddresses.length > 0 ? (
              <>
                <h3>{`${isDefault.streetName} n° ${isDefault.streetNumber}, apartment ${isDefault.apartment}`}</h3>
                <h3>{`Zip Code n° ${isDefault.zipCode}. ${isDefault.additionalDetails && isDefault.additionalDetails
                  } `}</h3>

                <h3>
                  {
                    isDefault[
                    Object.keys(isDefault)[Object.keys(isDefault).length - 1]
                    ]
                  }
                  , Argentina
                </h3>
                <button className={U.addAddress} onClick={handleOpen}>
                  Add a new address
                </button>
              </>
            ) : (
              <>
                <h3>You don't have any addresses yet</h3>
                <button className={U.addAddress} onClick={handleOpen}>
                  Add a new address
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
