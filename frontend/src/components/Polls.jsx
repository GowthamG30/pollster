import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Navbar from "./Navbar";
import Verify from "./Verify";

const Polls = () => {
  const [loaded, setLoaded] = useState(false);
  const [myPolls, setMyPolls] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
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
        setAllUsers(res.data.users);
        setCurrentUserName(res.data.currentUserName);
        setMyPolls(res.data.users.filter(user => user.username === res.data.currentUserName)[0].polls);
        setLoaded(true);
      })
      .catch(err => console.error(err));
  }, []);

  const handleClick = () => {
    // set properly later
    setShowMyPolls(!showMyPolls);
  };

  return (
    <>
      <Navbar />
      <Verify />
      <button name="myPolls" onClick={handleClick}>My polls</button>
      <button name="allPolls" onClick={handleClick}>All polls</button>
      {
        loaded ?
          allUsers.length ?
          (
            showMyPolls ?
            <div className="polls">
              {myPolls.map((poll) =>
                <Link to={"/poll/" + poll._id}>
                  <p>{poll.question === "" ? "Empty question" : (poll.question.length<=100 ? poll.question : poll.question.substr(0, 100)+"...")} -by {currentUserName}</p>
                </Link>
              )}
            </div> :
            <div className="polls">
              {allUsers.map((user) =>
                user.polls.map((poll) =>
                  <Link to={"/poll/" + poll._id}> {/* if we need user info of poll, put user._id here*/}
                    <p>{poll.question === "" ? "Empty question" : (poll.question.length<=100 ? poll.question : poll.question.substr(0, 100)+"...")} -by {user.username}</p>
                  </Link>
                )
              )}
            </div>
          ) :
          <h5>Oops no polls...</h5> :
        <Loader />
      }
    </>
  );
};

export default Polls;
