import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
	return (
    <>
      <Navbar />
			<div className="container">
				<div className="home-section">
					<div className="home-left-section">
						<h1 className="big-heading">Know the opinion of your audience with a simple poll!</h1>
					</div>
					<div className="home-right-section">
						<Link to="/create" className="create-button">
								Create Poll!
						</Link>
					</div>
				</div>
				<div className="features">
						<div className="feature-tab">
							<span class="material-icons-outlined feature-icon">add_circle_outline</span>
							<div className="feature-title">Create polls</div>
							<div className="feature-desc">Create and conduct polls at ease</div>
						</div>
						<div className="feature-tab">
							<span class="material-icons-outlined feature-icon">how_to_vote</span>
							<div className="feature-title">Cast your vote</div>
							<div className="feature-desc">Vote your opinions on polls</div>
						</div>
						<div className="feature-tab">
							<span class="material-icons-outlined feature-icon">poll</span>
							<div className="feature-title">Analyse results</div>
							<div className="feature-desc">Visualize the results in different ways</div>
						</div>
					</div>
			</div>
    </>
  );
};

export default Home;
