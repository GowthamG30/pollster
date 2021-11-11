import React from "react";
import { Link } from "react-router-dom";

// This component is used to convey that no polls are present if there are none.
// It also helps the user to create one, if he/she wants to.

const NoPolls = () => {
	return (
		<div className="box">
			<p>Uh oh...No polls here, <Link to="/create">Create one</Link></p>
		</div>
	);
};

export default NoPolls;
