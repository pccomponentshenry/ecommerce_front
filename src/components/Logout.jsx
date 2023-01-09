import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Profile } from "./Profile";
import L from "../styles/LoginContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions";

export const LogoutButton = props => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  return (
    <>
      <div className={L.logoutAndProfile}>
      {user.status === "banned" ? <></>:<Profile />}
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
