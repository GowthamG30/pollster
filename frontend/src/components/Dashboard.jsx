import React from "react";
import Features from "./Features";
import Navbar from "./Navbar";

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
