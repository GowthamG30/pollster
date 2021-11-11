import React from "react";
import { Link } from "react-router-dom"; 
import Nav from "./Nav";

// This page is rendered if the user tries to access a page which is not present in the application.

const NotFound = () => {
  return (
    <>
      <Nav />
      <div className="container not-found-page">
				<p className="four-zero-four">404</p>
				<p className="not-found-title">Page Not Found</p>
				<p className="not-found-desc">...maybe the page you are looking for is not found or never existed.</p>
				<Link to="/home" className="go-to-home-button">Go to Home</Link>
      </div>
    </>
  );
};

export default NotFound;
