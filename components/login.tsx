import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const Login = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <Button variant="contained" size="medium" onClick={loginWithPopup}>
        Login
    </Button>
  );
};

export default Login;