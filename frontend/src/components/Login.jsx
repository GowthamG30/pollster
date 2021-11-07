import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Verify from "./Verify";

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
    event.preventDefault();

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
        localStorage.setItem("accessToken", res.data.accessToken);
				setRedirect(true);
      })
      .catch(err => console.error("login err: " + err));
  };

  if(redirect) {
    // return <Redirect to="/home"/>;
    window.location.href = "/home";
  }

  // write class names in css
  return (
    <>
      <Navbar />
      <Verify />
      <form className="login-form" onSubmit={handleSubmit}>
        <input className="login-input" type="text" value={username || ""} placeholder="Username" autoComplete="off" onChange={event => handleUsername(event)} />
        <input className="login-input" type="password" value={password || ""} placeholder="Password" autoComplete="off" onChange={event => handlePassword(event)} />
        <p>New user? <Link to="/register">Register here</Link></p>
        <button className="login-button" type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
