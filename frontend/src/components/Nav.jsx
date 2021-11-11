import React from "react";
import { Link } from "react-router-dom";

// This is an auxiliary component similar to Navbar, but doesn’t display menu items.
// It is used to display when the nav-list is loading.

const Nav = () => {
	return (
		<nav className="navbar">
			<Link to="/" className="logo">
				Pollster
			</Link>
		</nav>
	);
};

export default Nav;
