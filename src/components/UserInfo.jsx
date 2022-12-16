import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import U from "../styles/UserInfo.module.css";

export default function UserInfo() {
  const { user, isLoading } = useAuth0();
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
          <hr />
          <h3 className={U.email}>{user.email}</h3>
        </div>
      </div>

      <div className={U.postalAdressContainer}>
        <h3 className={U.title}>Postal address</h3>
        <div className={U.adressCont}>
          <h3>{profileData.adress}</h3>
          <h3>{profileData.city}</h3>
          <h3>{profileData.province}</h3>
          <h3>{profileData.country}</h3>
          <h3>{profileData.postalCode}</h3>
        </div>
      </div>
    </div>
  );
}
