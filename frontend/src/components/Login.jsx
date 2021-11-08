import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Login = () => {
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");

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
    return <Redirect to="/home"/>;
  }

  return (
    <>
      <Navbar />
			<div className="login-page container">
				<h1 className="big-heading">Login here!</h1>
				<form className="login-form" onSubmit={handleSubmit}>
					<input className="login-input login-input-top" type="text" value={username || ""} placeholder="Username" autoComplete="off" onChange={event => handleUsername(event)} />
					<input className="login-input login-input-bottom" type="password" value={password || ""} placeholder="Password" autoComplete="off" onChange={event => handlePassword(event)} />
					<p>New user? <Link to="/register">Register here</Link></p>
					<button className="login-button" type="submit">Login</button>
				</form>
			</div>
    </>
  );
};

export default Login;
