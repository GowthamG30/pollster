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

    const params = JSON.stringify({
      "username": username,
      "password": password
    });
    // if (username) write

    axios
      .post("/api/register", params, {
        "headers": {
          "content-type": "application/json",
        },})
      .then(res => {
        console.log(res);
        setRedirect(true);
      })
      .catch(err => {
				console.error("Register err: ", err);
				// setError("User Already Exists");
			});
  };

  if(redirect) {
    return <Redirect to="/login"/>;
  }

  return (
    <>
      <Navbar />
      <form className="login-form" onSubmit={handleSubmit}>
        <input className="login-input" type="text" value={username || ""} placeholder="Username" autoComplete="off" onChange={event => handleUsername(event)} />
        <input className="login-input" type="password" value={password || ""} placeholder="Password" autoComplete="off" onChange={event => handlePassword(event)} />
        <p>Already a member? <Link to="/login">Login here</Link></p>
				<span className="error">{error}</span>
        <button className="login-button" type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
