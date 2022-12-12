import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import L from "../styles/LoginContainer.module.css";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button className={L.loginBtn} onClick={() => loginWithRedirect()}>
      Login
    </button>
  );
};
