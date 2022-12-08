import React from "react";
// import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  // const navigate = useNavigate();
  const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;
  // const audience = import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE;

  // const onRedirectCallback = appState => {
  //   navigate.push(appState?.returnTo || window.location.pathname);
  // };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      // onRedirectCallback={onRedirectCallback}
      // audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
