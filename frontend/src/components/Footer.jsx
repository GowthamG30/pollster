import React from "react";

// This component is present at the bottom of every page, mentioning the copyright statement.

const Footer = () => {
	const date = new Date();
	return (
		<footer>
			Copyright © {date.getFullYear()}
		</footer>
	);
};

export default Footer;
