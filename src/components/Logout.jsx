import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Profile } from "./Profile";
import L from "../styles/LoginContainer.module.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions";

export const LogoutButton = props => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();

  return (
    <>
      <div className={L.logoutAndProfile}>
        <Profile />
        <button
          onClick={() => {
            dispatch(logoutUser());
            logout({ returnTo: window.location.origin });
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};
