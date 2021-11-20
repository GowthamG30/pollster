import React from "react";

// This component is used to print any success messages of a page present in the success buffer
// which are accumulated whenever there is a requirement.

const Success = (props) => {
	return (
		<>
		{
			props.success.length ?
				<div className="msg success">
					<p>
						<span className="material-icons tick">check_circle_outline</span>
						{props.success}
					</p>
				</div>
			: null
		}
		</>
	);
};

export default Success;
