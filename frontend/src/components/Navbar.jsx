import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navigation-bar">
			<Link to="/" className="logo">
				Pollster
			</Link>

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
