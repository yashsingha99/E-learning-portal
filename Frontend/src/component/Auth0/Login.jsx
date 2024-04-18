import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import Button from "../Tags/Button";

const LoginButton = () => {
  const { user, loginWithRedirect } = useAuth0();
      console.log("Current user :",user);
  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;