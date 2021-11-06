import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Verify from "./Verify";

const Home = () => {
	return (
    <>
      <Navbar />
      <Verify />
      <div className="home-section">
        <div className="home-left-section">
          <h1 className="big-heading">Your Vote Matters a lot and a lootttttt!</h1>
        </div>
        <div className="home-right-section">
          <Link to="/create" className="create-button">
              Create Poll!
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
