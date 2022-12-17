import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Profile } from "./Profile";
import L from "../styles/LoginContainer.module.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions";

export const LogoutButton = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  dispatch(logoutUser());

  return (
    <div className={L.logoutAndProfile}>
      <Profile />
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Logout
      </button>
    </div>
  );
};
