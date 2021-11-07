import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Navbar from "./Navbar";

const Polls = () => {
  const [loaded, setLoaded] = useState(false);
  const [myPolls, setMyPolls] = useState([]);
  const [allPolls, setAllPolls] = useState([]);
  const [showMyPolls, setShowMyPolls] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    let requestOptions = {headers: {}};
		requestOptions.headers["content-type"] = "application/json";
		
		let accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
			requestOptions.headers["authorization"] = `Bearer ${accessToken}`;
    }
		JSON.stringify(requestOptions);

    axios
      .get("/api/polls", requestOptions)
      .then(res => {
        setCurrentUserName(res.data.currentUserName);
        setMyPolls(res.data.polls.filter(poll => poll.author === res.data.currentUserName));
        setAllPolls(res.data.polls);
        setLoaded(true);
      })
      .catch(err => console.error(err));
  }, []);

  const deletePoll = id => {
    let requestOptions = {headers: {}};
		requestOptions.headers["content-type"] = "application/json";
		
		let accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
			requestOptions.headers["authorization"] = `Bearer ${accessToken}`;
    }
		JSON.stringify(requestOptions);

    axios
      .delete("/api/poll/" + id, requestOptions)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.error(err));
  }

  const handleClick = (event) => {
    if(event.target.name === "myPolls") {
      setShowMyPolls(true);
    }
    else {
      setShowMyPolls(false);
    }
  };

  return (
    <>
      <Navbar />
      <button name="myPolls" onClick={handleClick}>My polls</button>
      <button name="allPolls" onClick={handleClick}>All polls</button>
      {
        loaded ?
          allPolls.length ?
          (
            showMyPolls ?
            <div className="polls">
              {myPolls.map((poll) => (
                <>
                  <Link to={"/poll/" + poll._id}>
                    <p>{poll.question === "" ? "Empty question" : (poll.question.length<=100 ? poll.question : poll.question.substr(0, 100)+"...")} -by {currentUserName}</p>
                  </Link>
                  <button type="button" className="remove" onClick={() => deletePoll(poll._id)}>
                    <span className="material-icons">delete_outline</span>
                  </button>
                </>
              ))}
            </div> :
            <div className="polls">
              {
                allPolls.map((poll) =>
                  <Link to={"/poll/" + poll._id}>
                    <p>{poll.question === "" ? "Empty question" : (poll.question.length<=100 ? poll.question : poll.question.substr(0, 100)+"...")} -by {poll.author}</p>
                  </Link>
                )
              }
            </div>
          ) :
          <h5>Oops no polls...</h5> :
        <Loader />
      }
    </>
  );
};

export default Polls;
