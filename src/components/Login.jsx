import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import L from "../styles/LoginContainer.module.css";

export const LoginButton = props => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
    <div className={L.containerLog}>
      <div className={L.inner}>
      <div className={L.loginBtn} onClick={() => loginWithRedirect()}>
        Login
      </div>
      </div>
      </div>
    </>
  );
};
