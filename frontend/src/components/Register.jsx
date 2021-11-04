import React, { useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";

const Register = () => {
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
      .catch(err => console.error(err));
  };

  if(redirect) {
    return <Redirect to="/login"/>;
  }

  // write class names in css
  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <p className="register-label">Username:</p>
      <input type="text" value={username || ""} placeholder="Username" autoComplete="off" onChange={event => handleUsername(event)} />
      
			<p className="register-label">Password:</p>
      <input type="password" value={password || ""} placeholder="Password" autoComplete="off" onChange={event => handlePassword(event)} />

			<button className="register" type="submit">Register</button>
    </form>
  );
};

export default Register;
