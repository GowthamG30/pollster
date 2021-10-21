import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div>
        <ul>
          <Link to="/">
            <li>
              Pollster
            </li>
          </Link>
        </ul>
      </div>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav ml-auto">
          <Link to="/polls">
            <li class="nav-item">
              Public Polls
            </li>
          </Link>
          <Link to="/about">
            <li class="nav-item">
              About
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;