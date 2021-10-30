import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
			<Link to="/" className="logo">
				Pollster
			</Link>

			{/* Hamburger */}
			<span className="material-icons hamburger">menu</span>

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
			</ul>
    </nav>
  );
};

export default Navbar;
