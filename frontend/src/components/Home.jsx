import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [redirect, setRedirect] = useState(false);

	useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    let headers = null;

    if(accessToken) {
      headers = {headers: {authorization: `Bearer ${accessToken}`}};
      JSON.stringify(headers);
    }

    axios
      .get("/api/verify", headers)
      .then()
      .catch(err => {
        // console.error("home err: " + err);
        setRedirect(true);
      });
  }, []);

  if(redirect) {
    return <Redirect to="/login"/>;
  }

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
