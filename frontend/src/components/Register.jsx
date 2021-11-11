import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Error from "./Error";
import Navbar from "./Navbar";
import Success from "./Success";

// Register page

const Register = () => {
  const [error, setError] = useState([]);
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [success, setSuccess] = useState("");
  const [username, setUsername] = useState("");
  
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let errorBuffer = [];

    // Validate Inputs
		if(!username)
			errorBuffer.push("Username should not be left empty");
		
		if(!password)
			errorBuffer.push("Password should not be left empty");

		if(errorBuffer.length) {
			setError(errorBuffer);			
			console.log("Error in validation" + errorBuffer);
			return;
		}

    const params = JSON.stringify({
      "username": username,
      "password": password
    });

    // Register user
    axios
      .post("/api/register", params, {
        "headers": {
          "content-type": "application/json",
        },})
      .then(res => {
        setSuccess("Registration Successful");
        setTimeout(() => {
          setRedirect(true);
        }, 750);
      })
      .catch(err => {
        errorBuffer.push(err.response.data);
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
        <h1 className="login-heading">Register here!</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input className="login-input login-input-top" type="text" value={username || ""} placeholder="Username" autoComplete="off" onChange={event => handleUsername(event)} />
          <input className="login-input login-input-bottom" type="password" value={password || ""} placeholder="Password" autoComplete="off" onChange={event => handlePassword(event)} />
          <p>Already a user? <Link to="/login">Login here</Link></p>
          <Error error={error}/>
          <button className="login-button" type="submit">Register</button>
          <Success success={success}/>
        </form>
      </div>
    </>
  );
};

export default Register;
