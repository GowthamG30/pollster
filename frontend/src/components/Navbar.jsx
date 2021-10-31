import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  let display;

  if(0) { // if user is authenticated
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
			</ul>
    )
  }

  return (
    <nav className="navbar">
      <Link to={1 ? "/home" : "/"} className="logo">
        Pollster
			</Link>

			{/* Hamburger */}
			<span className="material-icons hamburger">menu</span>

			{display /* menu */}
    </nav>
  );
};

export default Navbar;
