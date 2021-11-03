import React, { useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefauit();

    const params = JSON.stringify({
      "username": username,
      "password": password
    });

    axios
      .post("/api/login", params, {
        "headers": {
          "content-type": "application/json",
        },})
      .then(res => {
        localStorage.setItem("username", res.data.username);  
        localStorage.setItem("token", res.data.token);
      })
      .catch(err => console.error(err));
  };

  // if(redirect) {
  //   return <Redirect to="/home"/>;
  // }

  // write class names in css
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <p className="login-label">Username:</p>
      <input type="text" value={username || ""} placeholder="Username" autoComplete="off" onChange={event => handleUsername(event)} />
      
			<p className="login-label">Password:</p>
      <input type="text" value={password || ""} placeholder="Password" autoComplete="off" onChange={event => handlePassword(event)} />

			<button className="login" type="submit">Login</button>
    </form>
  );
};

export default Login;
