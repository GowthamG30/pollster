import React, { useState } from "react";
import { Link } from "react-router-dom";
import Features from "./Features";
import Navbar from "./Navbar";

// This is the landing page to be displayed if a user has logged in.
// It contains a gist of the web application and relevant options like Create, Polls, About, Logout.

const Home = () => {
	const [homeLoaded, setHomeLoaded] = useState(false);

	return (
    <>
      <Navbar setHomeLoaded={setHomeLoaded}/>
			{
				/* homeLoaded */ 1 ?
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
