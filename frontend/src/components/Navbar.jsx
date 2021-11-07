import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const [redirect, setRedirect] = useState(false);
  const [newPath, setNewPath] = useState("/");
  const [loaded, setLoaded] = useState(false);
  const [currentUserName, setCurrentUser] = useState("");
  // Paths for which authentication is NOT required
  const excludePaths = ["/", "/login", "/register", "/about"];

	useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    let requestOptions = null;

    if(accessToken) {
      requestOptions = {headers: {authorization: `Bearer ${accessToken}`}};
      JSON.stringify(requestOptions);
    }

    const currentPath = window.location.pathname;

    if(!excludePaths.includes(currentPath)) {
      axios
      .get("/api/verify", requestOptions)
      .then(res => {
        setCurrentUser(res.data);
        setLoaded(true);
        setIsAuthenticated(true);
      })
      .catch(err => {
        // console.error(err)
        setNewPath("/login");
        setLoaded(true);
        setRedirect(true);
      });
    }
  }, []);

  let display;

  if(isAuthenticated) { // if user is authenticated
    display = (
      <ul className="nav-list">
				<li className="nav-item">
					<Link to="/polls">
						Polls
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/about">
						About
					</Link>
				</li>
        <li className="nav-item">
						{currentUserName}
				</li>
        <li className="nav-item">
					<Link to="/logout">
						Logout
					</Link>
				</li>
			</ul>
    )
  }
  else {
    display = (
      <ul className="nav-list">
				<li className="nav-item">
					<Link to="/login">
						Login
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/register">
						Register
					</Link>
				</li>
        <li className="nav-item">
					<Link to="/about">
						About
					</Link>
				</li>
			</ul>
    )
  }

  if(redirect) {
    return <Redirect to={newPath} />;
  }

  return (
    loaded || excludePaths.includes(window.location.pathname) ? // except about, all good ig 
      <nav className="navbar">
        <Link to={isAuthenticated ? "/home" : "/"} className="logo">
          Pollster
        </Link>

        {/* Hamburger */}
        <span className="material-icons hamburger">menu</span>

        {display /* menu */}
      </nav> :
    <Nav />
  );
};


export default Navbar;
