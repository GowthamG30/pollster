import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

// This component is rendered in almost every other component.
// It is the header of each page and contains the links to various other pages.

const Navbar = (props) => {
	const [currentUserName, setCurrentUserName] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const commonPaths = ["/about"];
	const excludePaths = ["/", "/login", "/register"];

	useEffect(() => {
		// Send access token through authorization header
		// let accessToken = localStorage.getItem("accessToken");
		// let requestOptions = null;

		// if(accessToken) {
		// 	requestOptions = {headers: {authorization: `Bearer ${accessToken}`}};
		// 	JSON.stringify(requestOptions);
		// }

		const currentPath = window.location.pathname;

		if(!excludePaths.includes(currentPath)) {
			// Verify the user
			axios
				.get("/api/verify")
				.then(res => {
					console.log("done");
					setCurrentUserName(res.data);
					setIsAuthenticated(true);
					setLoaded(true);
					if(props.setHomeLoaded) props.setHomeLoaded(true);
				})
				.catch(err => {
					if(!commonPaths.includes(currentPath)) {
						setRedirect(true);
					}
					setLoaded(true);
					if(props.setHomeLoaded) props.setHomeLoaded(true);
				});
		}
		else if(commonPaths.includes(currentPath)) {
			setIsAuthenticated(true);
			setLoaded(true);
			if(props.setHomeLoaded) props.setHomeLoaded(true);
		}
	}, []);

	let navList;

	if(isAuthenticated) { // If user is authenticated
		navList = (
			<ul className="nav-list">
				<li className="nav-link user">
					{currentUserName}
				</li>
				<li>
					<Link to="/create" className="nav-link plus">
						<span className="material-icons-outlined">add</span>
					</Link>
				</li>
				<li>
					<Link to="/polls" className="nav-link">
						Polls
					</Link>
				</li>
				<li>
					<Link to="/about" className="nav-link">
						About
					</Link>
				</li>
				<li>
					<Link
						to="/"
						className="nav-link"
						onClick={() => {
							axios.get("/api/logout").then(res => console.log(res)).catch(err => console.log(err));
						}}>
						Logout
					</Link>
				</li>
			</ul>
		)
	}
	else {
		navList = (
			<ul className="nav-list">
				<li>
					<Link to="/login" className="nav-link">
						Login
					</Link>
				</li>
				<li>
					<Link to="/register" className="nav-link">
						Register
					</Link>
				</li>
				<li>
					<Link to="/about" className="nav-link">
						About
					</Link>
				</li>
			</ul>
		)
	}

	const handleClick = () => {
		const navList = document.querySelector('.nav-list');
		navList.classList.toggle('navbar-toggle');
	}

	if(redirect) {
		return <Navigate to="/" />;
	}

	return (
		loaded || excludePaths.includes(window.location.pathname) ? 
			<nav className="navbar">
				<Link to={isAuthenticated ? "/home" : "/"} className="logo">
					Pollster 
				</Link>

				{/* Hamburger */}
				<span className="material-icons hamburger" onClick={handleClick}>menu</span>

				{navList /* Display menu */}
			</nav> :
		<Nav />
	);
};

export default Navbar;
