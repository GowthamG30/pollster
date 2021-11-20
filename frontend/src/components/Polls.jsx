import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Navbar from "./Navbar";
import NoPolls from "./NoPolls";
import Success from "./Success";

// This page contains all the polls by default where each poll is truncated to atmost first 100 characters of the question.

const Polls = () => {
	const [allPolls, setAllPolls] = useState([]);
	const [currentUserName, setCurrentUserName] = useState("");
	const [loaded, setLoaded] = useState(false);
	const [myPolls, setMyPolls] = useState([]);
	const [showMyPolls, setShowMyPolls] = useState(false);
	const [success, setSuccess] = useState("");

	useEffect(() => {
		// Send access token through authorization header
		let requestOptions = {headers: {}};
		requestOptions.headers["content-type"] = "application/json";
		JSON.stringify(requestOptions);

		// Get all polls data
		axios
			.get("/api/polls", requestOptions)
			.then(res => {
				setCurrentUserName(res.data.currentUserName);

				const my_polls = res.data.polls.filter(poll => poll.author === res.data.currentUserName);
				my_polls.sort(compare);
				setMyPolls(my_polls);

				const all_polls = res.data.polls;
				all_polls.sort((a, b) => (a.author=== b.author) ? (compare(a.question, b.question)) : (a.author.toLowerCase() < b.author.toLowerCase() ? -1 : 1));
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

	const isUppercase = (ch) => {
		return ch === ch.toUpperCase();
	};

	const isLowercase = (ch) => {
		return ch === ch.toLowerCase();
	};

	// Compares two strings and returns the first index where they differ
	const compare = (a, b) => {
		const len_a = a.length, len_b = b.length;
		let i = 0, j = 0;
		while(i < len_a && j < len_b) {
			if(isLowercase(a[i]) && isLowercase(b[j])) {
				return (a[i]<b[j] ? -1 : 1);
			}
			else if(isUppercase(a[i]) && isUppercase(b[j])) {
				return (a[i]<b[j] ? -1 : 1);
			}
			else if(isLowercase(a[i]) && isUppercase(b[j])) {
				return -1;
			}
			else if(isUppercase(a[i]) && isLowercase(b[j])) {
				return 1;
			}
			i++; j++;
		}
		return 0;
	}

	const deletePoll = id => {
		// Send access token through authorization header
		let requestOptions = {headers: {}};
		requestOptions.headers["content-type"] = "application/json";
		JSON.stringify(requestOptions);

		// Delete a poll
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
							myPolls.map((poll, index) => (
							<div className="myPoll-list-item" key={index}>
								<Link to={"/poll/" + poll._id} className="myPoll-link">
									<p className="myPoll-content">{poll.question === "" ? "Empty question" : (poll.question.length<=100 ? poll.question : poll.question.substr(0, 100)+"...")}</p>
								</Link>
								<button type="button" className="btn remove" onClick={() => deletePoll(poll._id)}>
									<span className="material-icons">delete_outline</span>
								</button>
							</div>
							))
						}
					</div> :
					<NoPolls />
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
							allPolls.map((poll, index) =>
								<Link to={"/poll/" + poll._id} key={index} className="poll-link">
									<p className="poll-content">{poll.question === "" ? "Empty question" : (poll.question.length<=100 ? poll.question : poll.question.substr(0, 100)+"...")}</p>
									<p className="author">{`- ${poll.author}`}</p>
								</Link>
							)
						}
					</div> :
					<NoPolls />
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
							<Success success={success}/>
							<div className="btn-group">
								<button className="btn btn-group-btn left-btn" name="myPolls" onClick={handleClick}>My polls</button>
								<button className="btn btn-group-btn right-btn clicked" name="allPolls" onClick={handleClick}>All polls</button>
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
