import React from "react";

// This component is used to print any error messages of a page present in the error buffer
// which are accumulated whenever there is a requirement.

const Error = (props) => {
	return (
		<>
		{
			props.error.length ?
				<div className="msg error">
					{props.error.map((err, index) => 
						<p key={index}>
							<span class="material-icons warning">warning_amber</span>
							{err}
						</p>
					)}
				</div>
			: null
		}
		</>
	);
};

export default Error;
