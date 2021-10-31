import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefauit();
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  // write class names in css
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <p className="login-label">Username:</p>
      <input type="text" value={username || ""} placeholder="Username" autocomplete="off" onChange={event => handleUsername(event)} />
      
			<p className="login-label">Password:</p>
      <input type="text" value={password || ""} placeholder="Password" autocomplete="off" onChange={event => handlePassword(event)} />

			<button className="login" type="submit">Login</button>
    </form>
  );
};

export default Login;
