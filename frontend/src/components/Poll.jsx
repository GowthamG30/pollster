import React, { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from "axios";
import Error from "./Error";
import Loader from "./Loader";
import Navbar from "./Navbar";
import Success from "./Success";

// This page is used to view the question and options of each poll clearly and also vote for that poll.

const Poll = () => {
	const [currentUserName, setCurrentUserName] = useState("");
	const [error, setError] = useState([]);
	const [index, setIndex] = useState(-1);
	const [loaded, setLoaded] = useState(false);
	const [poll, setPoll] = useState({question: "", options: [{name: "", count: 0}], author: "", voters: []});
	const [redirect, setRedirect] = useState(false);
	const [success, setSuccess] = useState("");
	const { id } = useParams();

	useEffect(() => {
		// Send access token through authorization header
		let requestOptions = {headers: {}};
		requestOptions.headers["content-type"] = "application/json";
		JSON.stringify(requestOptions);

		// Get the poll data
		axios
			.get("/api/poll/" + id, requestOptions)
			.then(res => {
				setCurrentUserName(res.data.currentUserName);
				setPoll(res.data.poll);
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
	}, [id]);

	const handleSubmit = (event) => {
		event.preventDefault();
		let errorBuffer = [];

		if(index !== -1) {
			const params = JSON.stringify({
				"poll": poll,
				"index": index
			});

			if(!poll.voters.includes(currentUserName)) {
				// Send access token through authorization header
				let requestOptions = {headers: {}};
				requestOptions.headers["content-type"] = "application/json";
				JSON.stringify(requestOptions);
				
				// Vote for a poll
				axios
					.post("/api/vote/" + id, params, requestOptions)
					.then(res => {
						setSuccess("Vote submitted successfully!");
						setTimeout(() => {
							setRedirect(true);
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
			else {
				errorBuffer.push("You can only vote once!");
			}
		}
		else {
			errorBuffer.push("Select atleast one option");
		}
		setError(errorBuffer);
	}

	if(redirect) {
		return <Redirect to={"../poll/" + id + "/stats"}/>;
	}

	const onValueChange = (event) => {
		setIndex(event.target.value);
	};

	return (
		<>
			<Navbar />
			<div className="container">
				{
					loaded ?
						<>
							<div className="btn-group">
								<Link to={"/poll/"+id+"/stats"} className="btn btn-orange stats-btn">
									Stats
								</Link>
							</div>
							{
							poll.question === "" && poll.options[0].name === "" && poll.options[0].count === 0 ?
								<h5>Empty poll...</h5> :
								<form onSubmit={handleSubmit}>
									<div className="poll-form">
										<p className="poll-question">{poll.question}</p>
										{
											poll.options.map((option, index) => {
												return (
													<label className="poll-option-label" key={index}>
														<input
															type="radio"
															value={index}
															onChange={onValueChange}
															name={id}
														/>
														<p>{option.name}</p>
													</label>
												);
											})
										}
									</div>
									<Error error={error}/>
									<button className="btn btn-orange submit" type="submit">Vote</button>
									<Success success={success}/>
								</form>
							}
						</>
					: <Loader />
				}
			</div>
		</>
	);
};

export default Poll;
