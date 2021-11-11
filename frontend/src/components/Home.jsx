import React, { useState } from "react";
import { Link } from "react-router-dom";
import Features from "./Features";
import Navbar from "./Navbar";

const Home = () => {
	const [homeLoaded, setHomeLoaded] = useState(false);

	return (
    <>
      <Navbar setHomeLoaded={setHomeLoaded}/>
			{
				homeLoaded ?
					<div className="container">
						<div className="home-section">
							<div className="home-left-section">
								<h1 className="big-heading">Know the opinion of your audience with a simple poll!</h1>
							</div>
							<Link to="/create" className="btn btn-orange create-button">
									Create Poll!
							</Link>
						</div>
						<Features />
					</div>
				: null
			}
    </>
  );
};

export default Home;
