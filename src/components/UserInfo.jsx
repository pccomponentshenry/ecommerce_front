import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import U from "../styles/UserInfo.module.css";
import { useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import { capitalizeEachLetter } from "../utils/functions";
import { Link } from "react-router-dom";
import Loader from "../Images/loader.gif";
import defaultPic from "../Images/admin_pic.png";

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
  const defaultAddress = allAddresses.find(el => el.isDefault === true);
  const users = useSelector(state => state.user);

  if (isLoading) {
    return (
      <div className={U.container}>
        <div className={U.authContainer}>
          <div className={U.imgContainer}>
            <img className={U.loaderGif} src={Loader} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={U.AddressForm}>
        {form && (
          <AddressForm
            handleExit={handleExit}
            handleShowAddresses={handleShowAddresses}
          />
        )}
      </div>
      {users && (
        <div className={U.container}>
          <div className={U.authContainer}>
            <div className={U.imgContainer}>
              <img
                className={U.profilePic}
                src={user.picture.length > 0 ? user.picture : defaultPic}
                alt={user.name}
              />
            </div>
            <div className={U.nameContainer}>
              <h3 className={U.name}>{user.name}</h3>
              <h3 className={U.email}>{user.email}</h3>
              <h3 className={U.email}>
                Category: {users.isAdmin === "true" ? "Admin" : "User"}
              </h3>
              {users.isAdmin === "true" ? (
                <Link className={U.Link} to="/dashboard/">
                  <div className={U.DashBoardButton}>
                    <button>Go to Dashboard</button>
                  </div>
                </Link>
              ) : (
                ""
              )}
            </div>
            <hr className={U.profileLine} />
          </div>

          <div className={U.postalAdressContainer}>
            <h3 className={U.title}>Default shipping address</h3>

            <div className={U.adressCont}>
              {defaultAddress ? (
                <>
                  <h3>{`${capitalizeEachLetter(defaultAddress.streetName)} ${
                    defaultAddress.streetNumber
                  }, ${capitalizeEachLetter(defaultAddress.apartment)}`}</h3>
                  <h3>{`Zip Code: ${defaultAddress.zipCode}`}</h3>
                  <h3>{defaultAddress.locationName}, Argentina</h3>
                  <div className={U.addAddress} onClick={handleOpen}>
                    Add a new address
                  </div>
                </>
              ) : (
                <>
                  <h3>You don't have any addresses yet</h3>
                  <div className={U.addAddress} onClick={handleOpen}>
                    Add a new address
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
