import React, { useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Home = () => {
	useEffect(() => {
		const params = 

    axios
    .get("/api/verify", {}, {
			"headers": {
				"Authorization": "Bearer " + localStorage.getItem("accessToken")
			}
		})
    .then(res => {
      
    })
    .catch(err => console.error(err));
  }, []);

	return (
    <div className="home-section">
      <div className="home-left-section">
        <h1 className="big-heading">Your Vote Matters a lot and a lootttttt!</h1>
      </div>
      <div className="home-right-section">
        <button className="create-button">
          <Link to="/create">
              Create Poll!
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
