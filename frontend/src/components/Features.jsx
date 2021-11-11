import React from "react";

// This component contains the gist of the web application and is used in Dashboard and Home pages.

const Features = () => {
	return (
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
	);
};

export default Features;
