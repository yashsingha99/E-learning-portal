import { useState, useEffect } from "react";
import "./App.css";
import Header from "./component/header/Header";
import { Outlet } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Footer from "./component/Footer";
function App() {
  return (
    <>
       <Auth0Provider
               domain="dev-1xn20zw4434lds0n.us.auth0.com"
               clientId="APx5rEq00tUSKDnjEn1b1q7ZO7hGsrRs"
            authorizationParams={{
              redirect_uri : window.location.origin
            }}
         >
      <Header />
      <Outlet />
      <Footer />
      </Auth0Provider>
    </>
  );
}

export default App;
