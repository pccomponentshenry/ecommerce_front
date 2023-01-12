import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserInfo from "../components/UserInfo";
import UserFav from "../components/UserFav";
import ForSale from "../components/ForSale";
import Purchases from "../components/Purchases";
import ProfileAddresses from "../components/ProfileAddresses";
import U from "../styles/ProfileInfo.module.css";

export default function ProfileDetail(props) {
  const [active, setActive] = useState({
    fav: true,
    sales: false,
    purchases: false,
    addresses: false,
  });
  const [popUp, setPopUp] = useState({
    form: false,
    addresses: false,
  });

  const handleClick = e => {
    if (e.target.id === "sales") {
      return setActive({
        fav: false,
        sales: true,
        purchases: false,
        addresses: false,
      });
    }
    if (e.target.id === "purchases") {
      return setActive({
        fav: false,
        sales: false,
        purchases: true,
        addresses: false,
      });
    }
    if (e.target.id === "fav") {
      return setActive({
        fav: true,
        sales: false,
        purchases: false,
        addresses: false,
      });
    }
    if (e.target.id === "addresses") {
      return setActive({
        fav: false,
        sales: false,
        purchases: false,
        addresses: true,
      });
    }
  };
  const handleReset = () => {
    setPopUp({ form: false, addresses: false });
  };
  const handleExit = () => {
    setPopUp({
      ...popUp,
      form: false,
    });
  };
  const handleOpen = () => {
    setPopUp({
      ...popUp,
      form: true,
    });
  };
  const handleShowAddresses = () => {
    setPopUp({
      ...popUp,
      addresses: true,
    });
  };
  const handleCloseAddresses = () => {
    setPopUp({
      ...popUp,
      addresses: false,
    });
  };

  useEffect(() => {
    if (props.purchases) {
      setActive({
        fav: false,
        sales: false,
        purchases: true,
        addresses: false,
      });
      Swal.fire({
        title: "Successful Purchase!",
        html: `Thank you for your purchase <br><br> Redirecting to your orders...`,
        background: "#272727",
        color: "#fff",
        timer: 2000,
        showConfirmButton: false,
        backdrop: `
          rgba(130,130,130,0.4)
          left top
          no-repeat
        `,
      });
    }
  }, []);

  return (
    <div>
      <div className={U.infoContainer}>
        <UserInfo
          form={popUp.form}
          addresses={popUp.addresses}
          update={popUp.update}
          handleExit={handleExit}
          handleOpen={handleOpen}
          handleCloseAddresses={handleCloseAddresses}
          handleShowAddresses={handleShowAddresses}
          handleReset={handleReset}
        />
      </div>

      <div className={U.SwitchContainer}>
        <Link to="/sell">
          <div className={U.addProduct}>
            <h4>+</h4>
            <h5>New product</h5>
          </div>
        </Link>
        <div className={U.BtnContainer}>
          <button
            onClick={handleClick}
            id="fav"
            className={`${active.fav ? U.active : U.inactive} ${U.favBtn}`}
          >
            Favorites
          </button>
          <button
            onClick={handleClick}
            id="sales"
            className={`${active.sales ? U.active : U.inactive} ${U.salesBtn}`}
          >
            For sale
          </button>
          <button
            onClick={handleClick}
            id="purchases"
            className={`${active.purchases ? U.active : U.inactive} ${
              U.purchasesBtn
            }`}
          >
            Purchases
          </button>
          <button
            onClick={handleClick}
            id="addresses"
            className={`${active.addresses ? U.active : U.inactive} ${
              U.addressesBtn
            }`}
          >
            Addresses
          </button>
        </div>

        <div className={U.cardsContainerWhite}>
          {active.fav ? (
            <UserFav />
          ) : active.sales ? (
            <ForSale />
          ) : active.purchases ? (
            <Purchases />
          ) : (
            <ProfileAddresses />
          )}
        </div>
      </div>
    </div>
  );
}
