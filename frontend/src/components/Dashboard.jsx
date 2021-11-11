import React from "react";
import Features from "./Features";
import Navbar from "./Navbar";

// This is the landing page to be displayed if no user has logged in.
// It contains a gist of the web application and options to login and register.

const Dashboard = () => {
	return (
		<>
			<Navbar />
			<div className="container">
				<div className="home-section">
						<div className="home-left-section">
							<h1 className="big-heading">Know the opinion of your audience with a simple poll!</h1>
						</div>
					</div>
				<Features />
			</div>
		</>
	);
};

export default Dashboard;
