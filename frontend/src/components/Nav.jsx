import React from "react";
import { Link } from "react-router-dom";

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
