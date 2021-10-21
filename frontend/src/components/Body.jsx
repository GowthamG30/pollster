import React from "react";
import { Link } from 'react-router-dom';

function Body() {
  return (
      <div className="home-section">
        <h1 className="big-heading">Your Vote Matters!</h1>
        <button>
          <Link to="/create">
              Create Poll!
          </Link>
        </button>
      </div>
  );
}

export default Body;