import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div>
        <ul>
          <Link to="/">
            <li>
              Pollster
            </li>
          </Link>
        </ul>
      </div>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarToggler">
        <ul className="navbar-nav ml-auto">
          <Link to="/publicPolls">
            <li className="nav-item">
              Public Polls
            </li>
          </Link>
          <Link to="/about">
            <li className="nav-item">
              About
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;