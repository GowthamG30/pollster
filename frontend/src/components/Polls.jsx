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
		// Intitially all Polls are shown
		document.getElementsByName("allPolls")[0].classList.add("clicked");

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
      .catch(err => console.error(err));
  }, []);

  const handleClick = (event) => {
    // set properly later
    // setShowMyPolls(!showMyPolls);
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

  return (
    <>
      <Navbar />
      <Verify />
			<div className="container">
				<div className="btn-group">
					<button className="btn-group-btn left-btn " name="myPolls" onClick={handleClick}>My polls</button>
					<button className="btn-group-btn right-btn" name="allPolls" onClick={handleClick}>All polls</button>
				</div>
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
			</div>
    </>
  );
};

export default Polls;
