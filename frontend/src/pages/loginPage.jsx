import React from "react";
import {
    Button,
    FormInput
  } from "shards-react";

const LoginPage = () => {
  return (
    <div>
        <div style={{padding: "0px 0px 0px 25px"}}>
            <label style={{color: "#905EAF", fontSize: "72px"}}> Login</label>
            <p />
            <FormInput id="usernameText" placeholder="Username" />
            <FormInput id="passwordText" placeholder="Password" />
            <Button id="loginButton" theme="light" style={{textDecoration: 'none', color: 'white', borderColor: "#905EAF", backgroundColor: "#905EAF"}} > Login </Button>
        </div>
    </div>
  );
}

export default LoginPage;