import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

const Navbar = () => {
  const [currentUserName, setCurrentUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const commonPaths = ["/about"];
  const excludePaths = ["/", "/login", "/register"];

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
          setIsAuthenticated(true);
          setLoaded(true);
        })
        .catch(err => {
          // console.error("Navbar err:" + err);
          if(!commonPaths.includes(currentPath)) {
            setRedirect(true);
          }
          setLoaded(true);
        });
    }
    else if(commonPaths.includes(currentPath)) {
      setIsAuthenticated(true);
      setLoaded(true);
    }
  }, []);

  let navList;

  if(isAuthenticated) { // if user is authenticated
    navList = (
      <ul className="nav-list">
        <li className="nav-item">
          {currentUserName}
				</li>
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
					<Link to="/" onClick={() => {localStorage.removeItem("accessToken");}}>
						Logout
					</Link>
				</li>
			</ul>
    )
  }
  else {
    navList = (
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

  const handleClick = () => {
    const toggleButton = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('navbar-toggle');
  }

  if(redirect) {
    return <Redirect to="/"/>;
  }

  return (
    loaded || excludePaths.includes(window.location.pathname) ? // except about, all good ig 
      <nav className="navbar">
        <Link to={isAuthenticated ? "/home" : "/"} className="logo">
          Pollster 
        </Link>

        {/* Hamburger */}
        <span className="material-icons hamburger" onClick={handleClick}>menu</span>

        {navList /* menu */}
      </nav> :
    <Nav />
  );
};


export default Navbar;
