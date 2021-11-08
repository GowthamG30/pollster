import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Register = () => {
  const [error, setError] = useState("");
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
      .post("/api/register", params, {
        "headers": {
          "content-type": "application/json",
        },})
      .then(res => {
        setRedirect(true);
      })
      .catch(err => {
        errorBuffer += err.response.data;
        setError(errorBuffer);
			});
  };

  if(redirect) {
    return <Redirect to="/login"/>;
  }

  return (
    <>
      <Navbar />
      <div className="container login-page">
        <h1 className="big-heading">Register here!</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input className="login-input" type="text" value={username || ""} placeholder="Username" autoComplete="off" onChange={event => handleUsername(event)} />
          <input className="login-input" type="password" value={password || ""} placeholder="Password" autoComplete="off" onChange={event => handlePassword(event)} />
          <p>Already a member? <Link to="/login">Login here</Link></p>
          <span className="error">{error}</span>
          <button className="login-button" type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
