import React from "react";
import {Link} from "react-router-dom"; 
import Nav from "./Nav";

const NotFound = () => {
  return (
    <>
      <Nav />
      <div className="not-found">
        404 : Not Found
				<Link to="/" className="create-button">Go to Home Page</Link>
      </div>
    </>
  );
};

export default NotFound;