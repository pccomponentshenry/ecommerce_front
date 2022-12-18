import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import U from "../styles/UserInfo.module.css";
import { useSelector } from "react-redux";

export default function UserInfo() {
  const { isLoading, user } = useAuth0();
  // const user = useSelector(state => state.user);
  const profileData = {
    adress: "Calle falsa 123",
    city: "San Clemente del Tuyú",
    province: "Buenos Aires",
    country: "Argentina",
    postalCode: "7105",
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
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
        <span className={U.editBtn}>✎</span>
        <h3 className={U.title}>Postal address</h3>

        <div className={U.adressCont}>
          <h3>{profileData.adress}</h3>
          <h3>{profileData.city}</h3>
          <h3>
            {profileData.province}, {profileData.country}
          </h3>

          <h3>CP: {profileData.postalCode}</h3>
        </div>
      </div>
    </div>
  );
}
