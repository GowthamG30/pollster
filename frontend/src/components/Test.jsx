import React, {useEffect} from "react";
import axios from "axios";

const Test = () => {
	useEffect(() => {
		axios
			.get("/api/test")
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	}, []);

	return (
		<>OK</>
	);
};

export default Test;
