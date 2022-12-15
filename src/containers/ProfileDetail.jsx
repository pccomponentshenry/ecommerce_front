import React from "react";
import UserInfo from "../components/UserInfo";
import UserFav from "../components/UserFav";

export default function ProfileDetail() {
  return (
    <div>
      <div>
        <UserInfo />
      </div>
      <div>
        <UserFav />
      </div>
    </div>
  );
}
