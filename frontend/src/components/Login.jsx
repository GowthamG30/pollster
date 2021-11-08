import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Login = () => {
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let errorBuffer = "";
    // Validate Inputs
		if(!username)
			errorBuffer += "Username should not be left empty\n";
		
		if(!password)
			errorBuffer += "Username should not be left empty\n";

		if(errorBuffer) {
			setError(errorBuffer);			
			console.log("Error in validation" + errorBuffer);
			return;
		}

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
      .catch(err => {
        errorBuffer += err.response.data;
        setError(errorBuffer);
			});
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
          <span className="error">{error}</span>
					<button className="login-button" type="submit">Login</button>
				</form>
			</div>
    </>
  );
};

export default Login;
