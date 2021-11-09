import React from "react";
import { Link } from "react-router-dom"; 
import Nav from "./Nav";

const NotFound = () => {
  return (
    <>
      <Nav />
      <div className="container not-found-page">
			<span class="material-icons not-found-img">warning_amber</span>
			<p className="not-found-message">404<br/>Page Not Found</p>
			<Link to="/" className="create-button">Go to Home</Link>
      </div>
    </>
  );
};

export default NotFound;