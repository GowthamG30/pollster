import React from "react";
import { Link } from 'react-router-dom';

const Body = () => {
  return (
    <div className="home-section">
      <div className="home-left-section">
        <h1 className="big-heading">Your Vote Matters a lot and a lootttttt!</h1>
      </div>
      <div className="home-right-section">
        <button className="create-button">
          <Link to="/create">
              Create Poll!
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Body;
