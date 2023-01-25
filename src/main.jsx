import React from "react";
// import ReactDOM from "react-dom/client";  
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import { render } from "react-dom";

import Auth0ProviderWithHistory from "./auth0/Auth0ProviderWithHistory";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Auth0ProviderWithHistory>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </Auth0ProviderWithHistory>
//   </React.StrictMode>
// );

render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0ProviderWithHistory>
  </React.StrictMode>,
document.getElementById("root"));