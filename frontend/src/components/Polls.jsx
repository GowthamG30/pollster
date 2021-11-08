import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Navbar from "./Navbar";

const Polls = () => {
  const [allPolls, setAllPolls] = useState([]);
  const [currentUserName, setCurrentUserName] = useState("");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [myPolls, setMyPolls] = useState([]);
  const [showMyPolls, setShowMyPolls] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
		// JWT verification for API request
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

        const my_polls = res.data.polls.filter(poll => poll.author === res.data.currentUserName);
        my_polls.sort((a, b) => (a.question < b.question ? -1 : 1));
        setMyPolls(my_polls);

        const all_polls = res.data.polls;
        all_polls.sort((a, b) => (a.author === b.author) ? (a.question < b.question ? -1 : 1) : (a.author < b.author ? -1 : 1));
        setAllPolls(all_polls);

        setLoaded(true);
      })
      .catch(err => {
        if(err.response.status === 403) {
          alert("Session expired");
          window.location.reload();
        }
        else if(err.response.status === 500) {
          alert("Internal server error");
        }
        else {
          alert("Something went wrong");
        }
      });
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
        setSuccess("Poll deleted.");
        setTimeout(() => {
          window.location.reload();
        }, 750);
      })
      .catch(err => {
        if(err.response.status === 403) {
          alert("Session expired");
          window.location.reload();
        }
        else if(err.response.status === 500) {
          alert("Internal server error");
        }
        else {
          alert("Something went wrong");
        }
      });
  }

  const handleClick = (event) => {
		if(event.target.name === "myPolls") {
			setShowMyPolls(true);
			document.getElementsByName("myPolls")[0].classList.add("clicked");
			document.getElementsByName("allPolls")[0].classList.remove("clicked");
		}
		else {
			setShowMyPolls(false);
			document.getElementsByName("allPolls")[0].classList.add("clicked");
			document.getElementsByName("myPolls")[0].classList.remove("clicked");
		}
  };

  const getPolls = () => {
    if(showMyPolls) {
      return (
        <>
        {
          myPolls.length ?
          <div className="polls">
            {
              myPolls.map((poll) => (
              <>
                <Link to={"/poll/" + poll._id}>
                  <p>{poll.question === "" ? "Empty question" : (poll.question.length<=100 ? poll.question : poll.question.substr(0, 100)+"...")} -by {currentUserName}</p>
                </Link>
                <button type="button" className="remove" onClick={() => deletePoll(poll._id)}>
                  <span className="material-icons">delete_outline</span>
                </button>
              </>
              ))
            }
          </div> :
          <h5>Oops no polls...</h5>
        }
        </>
      );
    }
    else {
      return (
        <>
        {
          allPolls.length ?
          <div className="polls">
            {
              allPolls.map((poll) =>
                <Link to={"/poll/" + poll._id}>
                  <p>{poll.question === "" ? "Empty question" : (poll.question.length<=100 ? poll.question : poll.question.substr(0, 100)+"...")} -by {poll.author}</p>
                </Link>
              )
            }
          </div> :
          <h5>Oops no polls...</h5>
        }
        </>
      );
    }
  }

  return (
    <>
      <Navbar />
			<div className="container">
				{
          loaded ?
            <>
              <span className="error">{error}</span>
              <span className="success">{success}</span>
              <div className="btn-group">
                <button className="btn-group-btn left-btn" name="myPolls" onClick={handleClick}>My polls</button>
                <button className="btn-group-btn right-btn clicked" name="allPolls" onClick={handleClick}>All polls</button>
              </div>
              {getPolls()}
            </> :
          <Loader />
        }
			</div>
    </>
  );
};

export default Polls;
